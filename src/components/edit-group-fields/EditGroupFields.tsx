import React, {FC, JSX, memo, useCallback, useState} from 'react';
import {View, FlatList, TouchableOpacity, Keyboard} from 'react-native';
import {IUser} from '../../stores/userStore';
import {CustomInput} from '../../components/custom-input/CustomInput';
import {Icon, IconButton, Text} from 'react-native-paper';
import {colors} from '../../theme/colors';
import {CustomButton} from '../../components/custom-button/CustomButton';
import {SelectModal} from '../../components/select-modal/SelectModal';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';

export interface IFriendsData {
  id: number;
  label: string;
  value: IUser;
}

interface IProps {
  groupName: string;
  setGroupName: (value: string) => void;
  setNameInput: (value: string) => void;
  setEmailInput: (value: string) => void;
  nameInput: string;
  onFriendsSelect: (selected: IUser | IUser[]) => void;
  addFakeInviteeByName: () => void;
  addInviteeByEmail: () => void;
  emailInput: string;
  isGettingByEmail: boolean;
  isFakeCreating: boolean;
  inviteeArray: IUser[];
  friendsData: IFriendsData[];
  isCreating: boolean;
  renderItem: ({item}: {item: IUser}) => JSX.Element;
  selectedId: number | null;
  handleCreateGroup: () => void;
  createButtonTitle: string;
}

const keyExtractor = (item: IUser) => item.email;

export const EditGroupFields: FC<IProps> = memo(
  ({
    groupName,
    setGroupName,
    setNameInput,
    setEmailInput,
    nameInput,
    onFriendsSelect,
    addFakeInviteeByName,
    addInviteeByEmail,
    emailInput,
    isGettingByEmail,
    isFakeCreating,
    inviteeArray,
    friendsData,
    isCreating,
    renderItem,
    selectedId,
    handleCreateGroup,
    createButtonTitle,
  }) => {
    const [friendsModalIsVisible, setFriendsModalIsVisible] = useState(false);

    const {t} = useTranslation();

    const showFriendsModal = useCallback(() => {
      setFriendsModalIsVisible(true);
    }, []);

    const hideFriendsModal = useCallback(() => {
      setFriendsModalIsVisible(false);
    }, []);

    const handleAddByName = useCallback(() => {
      Keyboard.dismiss();
      addFakeInviteeByName();
    }, [addFakeInviteeByName]);

    const handleAddByEmail = useCallback(() => {
      Keyboard.dismiss();
      addInviteeByEmail();
    }, [addInviteeByEmail]);

    return (
      <>
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
                    onSubmitEditing={handleAddByEmail}
                    type="outlined"
                    width={'80%'}
                  />
                  <IconButton
                    icon="check"
                    iconColor={colors.darkWhite}
                    size={24}
                    onPress={handleAddByName}
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
                    onSubmitEditing={handleAddByEmail}
                    type="outlined"
                    width={'80%'}
                  />
                  <IconButton
                    icon="check"
                    iconColor={colors.darkWhite}
                    size={24}
                    onPress={handleAddByEmail}
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
              keyboardShouldPersistTaps="handled"
              bounces={false}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
          <View style={styles.createButton}>
            <CustomButton
              title={createButtonTitle}
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
      </>
    );
  },
);
