import React, {FC, memo, useCallback, useState} from 'react';
import {ScrollView, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {TSplitPaidBy} from '../../stores/expenseStore';
import groupStore from '../../stores/groupStore';
import {GroupSelectModal} from '../../components/group-select-modal/GroupSelectModal';
import {styles} from './styles';
import {IUser} from '../../stores/userStore';
import {EditExpenseFormUsersList} from './EditExpenseFormUsersList';

interface IProps {
  handleAmountChange: (
    userId: number,
    value: string,
    type: 'paid' | 'split',
  ) => void;
  setGroupId: (groupId: number) => void;
  setAmount: (amount: string) => void;
  setDescription: (description: string) => void;
  splits: TSplitPaidBy[];
  paidBy: TSplitPaidBy[];
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

    return (
      <ScrollView
        contentContainerStyle={styles.scrollview}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Pressable onPress={openGroupsList} style={styles.input}>
          <TextInput
            label={t('add_expense.group')}
            value={groupName}
            editable={false}
            pointerEvents="none"
          />
        </Pressable>
        <TextInput
          label={t('add_expense.description')}
          keyboardType="numeric"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TextInput
          label={t('add_expense.sum')}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
        <EditExpenseFormUsersList
          {...{handleAmountChange, paidBy, splits, users}}
        />
        <GroupSelectModal
          visible={modalVisible}
          onDismiss={closeGroupsList}
          groups={groupStore.groups}
          onSelect={setGroupId}
        />
      </ScrollView>
    );
  },
);
