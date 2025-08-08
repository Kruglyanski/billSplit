import React, {FC, useCallback, useMemo, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react-lite';
import groupStore from '../../stores/groupStore';
import userStore, {IUser} from '../../stores/userStore';
import {CreateGroupScreenNavigationProps} from '../../navigation/types';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {useTranslation} from 'react-i18next';
import {DEFAULT_GRADIENT_COLORS} from '../../constants';
import {CustomInput} from '../../components/custom-input/CustomInput';
import {Icon, IconButton, Text} from 'react-native-paper';
import {colors} from '../../theme/colors';
import {CustomButton} from '../../components/custom-button/CustomButton';
import {SelectModal} from '../../components/select-modal/SelectModal';
import {ParticipantCard} from '../../components/participant-card/ParticipantCard';
import {styles} from './styles';
import {appStore} from '../../stores/appStore';
import {useInvitees} from './hooks';
import {isValidEmail} from '../../utils/helpers/is-valid-email';

interface IProps {
  navigation: CreateGroupScreenNavigationProps['navigation'];
}

const keyExtractor = (item: IUser) => item.email;

export const CreateGroupScreen: FC<IProps> = observer(({navigation}) => {
  const [groupName, setGroupName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [friendsModalIsVisible, setFriendsModalIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isGettingByEmail, setIsGettingByEmail] = useState(false);
  const [isFakeCreating, setIsFakeCreating] = useState(false);

  const {invitees, inviteeArray, addInvitee, removeInvitee, clearInvitees} =
    useInvitees();

  const {t} = useTranslation();

  const showFriendsModal = useCallback(() => {
    setFriendsModalIsVisible(true);
  }, []);

  const hideFriendsModal = useCallback(() => {
    setFriendsModalIsVisible(false);
  }, []);

  const onFriendsSelect = useCallback((selected: IUser | IUser[]) => {
    const selectedArray = Array.isArray(selected) ? selected : [selected];
    selectedArray.forEach(addInvitee);
  }, []);

  const handlePressItem = useCallback((id: number) => {
    setSelectedId(prevId => (prevId === id ? null : id));
  }, []);

  const deleteFromInvitees = useCallback(
    (id: number) => {
      removeInvitee(id);
      if (id === selectedId) setSelectedId(null);
    },
    [selectedId],
  );

  const addFakeInviteeByName = useCallback(async () => {
    try {
      setIsFakeCreating(true);
      const user = await userStore.createUserWithFakeEmail(nameInput);

      addInvitee(user);
      setNameInput('');
    } catch (error) {
      appStore.showInfoModal({
        message: t('create_group.errors.user_not_created'),
      });
    } finally {
      setIsFakeCreating(false);
    }
  }, [nameInput]);

  const addInviteeByEmail = useCallback(async () => {
    const email = emailInput.trim().toLowerCase();

    if (!email)
      return appStore.showInfoModal({
        message: t('create_group.errors.enter_email'),
      });

    if (!isValidEmail(email)) {
      return appStore.showInfoModal({
        message: t('create_group.errors.incorrect_email'),
      });
    }

    if (inviteeArray.some(v => v.email === email)) {
      return appStore.showInfoModal({
        message: t('create_group.errors.user_already_added'),
      });
    }

    try {
      setIsGettingByEmail(true);
      const res = await userStore.fetchUserByEmail(email);
      if (res) {
        addInvitee(res);
      }

      setEmailInput('');
    } catch (error: any) {
      appStore.showInfoModal({
        message:
          error.response?.data?.message ||
          t('create_group.errors.user_add_error'),
      });
    } finally {
      setIsGettingByEmail(false);
    }
  }, [invitees, emailInput]);

  const handleCreateGroup = useCallback(async () => {
    if (isCreating) return;

    if (!groupName.trim()) {
      return appStore.showInfoModal({
        message: t('create_group.errors.enter_group_title'),
      });
    }

    if (!inviteeArray.length) {
      return appStore.showInfoModal({
        message: t('create_group.no_participants'),
      });
    }

    const userIds = inviteeArray.reduce<number[]>((acc, item) => {
      if (item.id !== undefined) {
        acc.push(item.id);
      }
      return acc;
    }, []);

    try {
      setIsCreating(true);
      const groupId = await groupStore.createGroup(groupName.trim(), userIds);

      if (groupId) {
        setGroupName('');
        clearInvitees();
        navigation.navigate('GroupList');
      }
    } catch (error: any) {
      appStore.showInfoModal({
        message: error.response?.data?.message,
      });
    } finally {
      setIsCreating(false);
    }
  }, [groupName, inviteeArray, navigation]);

  const renderItem = useCallback(
    ({item}: {item: IUser}) => {
      const isSelected = item.id === selectedId;
      return (
        <ParticipantCard
          {...{isSelected, item}}
          handlePress={handlePressItem}
          handleDeletePress={deleteFromInvitees}
        />
      );
    },
    [selectedId, handlePressItem],
  );

  const friendsData = useMemo(
    () =>
      [...userStore.users.values()].map(friend => ({
        id: friend.id ?? friend.email,
        label: friend.name,
        value: friend,
      })),
    [userStore.users],
  );

  const headerButtons: IButtonSettings[] = useMemo(() => {
    return [
      {
        icon: 'chevron-left',
        onPress: navigation.goBack,
      },
    ];
  }, [navigation]);

  return (
    <ScreenWrapper
      title={t('create_group.title')}
      gradientColors={DEFAULT_GRADIENT_COLORS}
      buttons={headerButtons}>
      <View style={styles.content}>
        <CustomInput
          label={t('create_group.event_title')}
          value={groupName}
          onChangeText={setGroupName}
          type="filled"
          height={52}
        />
        <View style={styles.addInviteeContainer}>
          <View style={styles.blockTitleWrapper}>
            <Icon
              size={32}
              source="account-plus-outline"
              color={colors.darkWhite}
            />
            <Text variant="titleLarge" style={styles.blockTitle}>
              {t('create_group.add_participant')}
            </Text>
          </View>
          <View style={styles.addForm}>
            <View style={styles.inputFields}>
              <View style={styles.inputField}>
                <CustomInput
                  label={t('create_group.invitee_name')}
                  value={nameInput}
                  onChangeText={setNameInput}
                  onSubmitEditing={addFakeInviteeByName}
                  type="outlined"
                  width={'80%'}
                />
                <IconButton
                  icon="check"
                  iconColor={colors.darkWhite}
                  size={24}
                  onPress={addFakeInviteeByName}
                  style={styles.addButton}
                  loading={isFakeCreating}
                  disabled={isFakeCreating || !nameInput.trim()}
                />
              </View>
              <View style={styles.inputField}>
                <CustomInput
                  label={t('create_group.invitee_email')}
                  value={emailInput}
                  onChangeText={setEmailInput}
                  onSubmitEditing={addInviteeByEmail}
                  type="outlined"
                  width={'80%'}
                />
                <IconButton
                  icon="check"
                  iconColor={colors.darkWhite}
                  size={24}
                  onPress={addInviteeByEmail}
                  style={styles.addButton}
                  loading={isGettingByEmail}
                  disabled={isGettingByEmail || !emailInput.trim()}
                />
              </View>
              <TouchableOpacity
                onPress={showFriendsModal}
                style={styles.inputField}>
                <CustomInput
                  label={t('create_group.add_from_list')}
                  value={''}
                  type="outlined"
                  editable={false}
                  width={'80%'}
                />
                <IconButton
                  icon="human-capacity-increase"
                  iconColor={colors.darkWhite}
                  size={24}
                  onPress={showFriendsModal}
                  style={styles.addButton}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.inviteeListContainer}>
          <View style={styles.blockTitleWrapper}>
            <Icon
              size={32}
              source="account-group-outline"
              color={colors.darkWhite}
            />
            <Text variant="titleLarge" style={styles.blockTitle}>
              {t('create_group.participants_title')}
            </Text>
          </View>
          <FlatList
            data={inviteeArray}
            extraData={selectedId}
            ListEmptyComponent={
              <Text variant="titleMedium" style={styles.placeholder}>
                {t('create_group.list_placeholder')}
              </Text>
            }
            contentContainerStyle={styles.flatlist}
            showsVerticalScrollIndicator={false}
            bounces={false}
            {...{renderItem, keyExtractor}}
          />
        </View>
        <View style={styles.createButton}>
          <CustomButton
            title={t('create_group.create')}
            onPress={handleCreateGroup}
            type={'primary'}
            height={48}
            loading={isCreating}
          />
        </View>
      </View>
      <SelectModal
        multiple
        visible={friendsModalIsVisible}
        options={friendsData}
        onDismiss={hideFriendsModal}
        onSelect={onFriendsSelect}
      />
    </ScreenWrapper>
  );
});
