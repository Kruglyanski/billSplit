import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {ScrollView, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';
import groupStore from '../../stores/groupStore';
import {styles} from './styles';
import {IUser} from '../../stores/userStore';
import {EditExpenseFormUsersList} from './EditExpenseFormUsersList';
import {CustomInput} from '../custom-input/CustomInput';
import {ISelectModalOption, SelectModal} from '../select-modal/SelectModal';
import {TSplitPaidByExtended} from '../../screens/AddExpense/AddExpenseScreen';

interface IProps {
  handleAmountChange: (
    userId: number,
    value: string,
    type: 'paid' | 'split',
  ) => void;
  setGroupId: (groupId: number) => void;
  setAmount: (amount: string) => void;
  setDescription: (description: string) => void;
  splits: TSplitPaidByExtended[];
  paidBy: TSplitPaidByExtended[];
  groupName: string;
  amount: string;
  description: string;
  users: IUser[];
}

export const EditExpenseForm: FC<IProps> = memo(
  ({
    handleAmountChange,
    setGroupId,
    setAmount,
    setDescription,
    paidBy,
    splits,
    groupName,
    amount,
    description,
    users,
  }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const {t} = useTranslation();

    const openGroupsList = useCallback(() => {
      setModalVisible(true);
    }, []);

    const closeGroupsList = useCallback(() => {
      setModalVisible(false);
    }, []);

    const groupData: ISelectModalOption<number>[] = useMemo(
      () =>
        [...groupStore.groups.values()].map(group => ({
          id: group.id ?? group.name,
          label: group.name,
          value: group.id,
        })),
      [groupStore.groups],
    );

    return (
      <ScrollView
        contentContainerStyle={styles.scrollview}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Pressable onPress={openGroupsList}>
          <CustomInput
            label={t('add_expense.group')}
            value={groupName}
            type="outlined"
            editable={false}
            height={52}
          />
        </Pressable>
        <CustomInput
          label={t('add_expense.description')}
          value={description}
          onChangeText={setDescription}
          type="outlined"
          height={52}
        />
        <CustomInput
          label={t('add_expense.sum')}
          value={amount}
          onChangeText={setAmount}
          type="outlined"
          keyboardType="numeric"
          height={52}
        />
        <EditExpenseFormUsersList
          handleAmountChange={handleAmountChange}
          splits={splits}
          paidBy={paidBy}
          users={users}
        />
        <SelectModal
          visible={modalVisible}
          options={groupData}
          onDismiss={closeGroupsList}
          onSelect={setGroupId}
        />
      </ScrollView>
    );
  },
);
