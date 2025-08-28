import React, {FC, useCallback, useMemo, useState} from 'react';
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
import {ParticipantCard} from '../../components/participant-card/ParticipantCard';
import {appStore} from '../../stores/appStore';
import {useInvitees} from '../../hooks/use-invitees';
import {isValidEmail} from '../../utils/helpers/is-valid-email';
import {
  EditGroupFields,
} from '../../components/edit-group-fields/EditGroupFields';
import { ISelectModalOption } from '../../components/select-modal/SelectModal';

interface IProps {
  navigation: CreateGroupScreenNavigationProps['navigation'];
}

export const CreateGroupScreen: FC<IProps> = observer(({navigation}) => {
  const [groupName, setGroupName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isGettingByEmail, setIsGettingByEmail] = useState(false);
  const [isFakeCreating, setIsFakeCreating] = useState(false);

  const {invitees, inviteeArray, addInvitee, removeInvitee, clearInvitees} =
    useInvitees();

  const {t} = useTranslation();

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
          isSelected={isSelected}
          item={item}
          handlePress={handlePressItem}
          handleDeletePress={deleteFromInvitees}
        />
      );
    },
    [selectedId, handlePressItem],
  );

  const friendsData: ISelectModalOption<IUser>[] = useMemo(
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
    ] satisfies IButtonSettings[];
  }, [navigation]);

  return (
    <ScreenWrapper
      title={t('create_group.title')}
      gradientColors={DEFAULT_GRADIENT_COLORS}
      buttons={headerButtons}>
      <EditGroupFields
        createButtonTitle={t('create_group.create')}
        groupName={groupName}
        setGroupName={setGroupName}
        setNameInput={setNameInput}
        setEmailInput={setEmailInput}
        nameInput={nameInput}
        onFriendsSelect={onFriendsSelect}
        addFakeInviteeByName={addFakeInviteeByName}
        addInviteeByEmail={addInviteeByEmail}
        emailInput={emailInput}
        isGettingByEmail={isGettingByEmail}
        isFakeCreating={isFakeCreating}
        inviteeArray={inviteeArray}
        friendsData={friendsData}
        isCreating={isCreating}
        renderItem={renderItem}
        selectedId={selectedId}
        handleCreateGroup={handleCreateGroup}
      />
    </ScreenWrapper>
  );
});
