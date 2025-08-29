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
import {TSplitPaidBy} from '../../stores/expenseStore';
import {Text} from 'react-native-paper';
import {CustomButton} from '../custom-button/CustomButton';

interface IProps {
  handleAmountChange: (
    userId: number,
    value: string,
    type: 'paid' | 'split',
  ) => void;
  setGroupId: (groupId: number) => void;
  setAmount: (amount: string) => void;
  setDescription: (description: string) => void;
  onSaveButtonPress?: () => void;
  splits: TSplitPaidByExtended[] | TSplitPaidBy[];
  paidBy: TSplitPaidByExtended[] | TSplitPaidBy[];
  groupName: string;
  amount: string;
  description: string;
  users: IUser[];
  enableGroupSelector?: boolean;
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
    enableGroupSelector = true,
    onSaveButtonPress,
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
        <Text style={styles.label}>{t('add_expense.event_title')}</Text>
        <Pressable onPress={openGroupsList} disabled={!enableGroupSelector}>
          <CustomInput
            label={t('add_expense.group')}
            value={groupName}
            type="outlined"
            editable={false}
            height={52}
          />
        </Pressable>
        <Text style={styles.label}>{t('add_expense.expense_title')}</Text>
        <CustomInput
          label={t('add_expense.description')}
          value={description}
          onChangeText={setDescription}
          type="outlined"
          height={52}
        />
        <Text style={styles.label}>{t('add_expense.total_sum')}</Text>
        <CustomInput
          label={t('add_expense.sum')}
          value={amount}
          onChangeText={setAmount}
          type="outlined"
          keyboardType="numeric"
          height={52}
        />
        {!!users.length && (
          <EditExpenseFormUsersList
            handleAmountChange={handleAmountChange}
            splits={splits}
            paidBy={paidBy}
            users={users}
          />
        )}
        {!!onSaveButtonPress && (
          <CustomButton
            type="secondary"
            onPress={onSaveButtonPress}
            title={t('add_expense.save')}
          />
        )}
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
