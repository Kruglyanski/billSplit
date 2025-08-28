import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import expenseStore, {TSplitPaidBy} from '../../stores/expenseStore';
import groupStore from '../../stores/groupStore';
import {AddExpenseScreenNavigationProps} from '../../navigation/types';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {appStore} from '../../stores/appStore';
import {EditExpenseForm} from '../../components/edit-expense-form/EditExpenseForm';
import {DEFAULT_GRADIENT_COLORS} from '../../constants';

interface IProps extends AddExpenseScreenNavigationProps {}

export const AddExpenseScreen: FC<IProps> = observer(({route, navigation}) => {
  const {groupId: paramGroupId} = route.params;

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [groupId, setGroupId] = useState(paramGroupId || null);
  const [splits, setSplits] = useState<TSplitPaidBy[]>([]);
  const [paidBy, setPaidBy] = useState<TSplitPaidBy[]>([]);

  const group = groupStore.groups.get(groupId || -1);
  const participants = useMemo(() => group?.members ?? [], [group?.members]);

  const {t} = useTranslation();

  useEffect(() => {
    setSplits(participants.map(p => ({userId: p.id, amount: 0})));
    setPaidBy(participants.map(p => ({userId: p.id, amount: 0})));
  }, [participants]);

  const handleAmountChange = useCallback(
    (userId: number, value: string, type: 'paid' | 'split') => {
      const amount = Number(value);

      const setters = {
        paid: setPaidBy,
        split: setSplits,
      };

      setters[type](prev => {
        return prev.some(s => s.userId === userId)
          ? prev.map(s => (s.userId === userId ? {...s, amount} : s))
          : [...prev, {userId, amount}];
      });
    },
    [setPaidBy, setSplits],
  );

  const handleSubmit = useCallback(async () => {
    if (!description || !amount || !groupId) {
      appStore.showInfoModal({
        message: t('add_expense.fill_all_fields'),
      });

      return;
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      appStore.showInfoModal({
        message: t('add_expense.sum_must_be_positive'),
      });

      return;
    }

    if (paidBy && splits) {
      const paidSum = paidBy.reduce((sum, p) => sum + p.amount, 0);

      if (paidSum !== numericAmount) {
        appStore.showInfoModal({
          message: t('add_expense.sums_must_be equal', {
            paidSum,
            numericAmount,
          }),
        });

        return;
      }

      try {
        await expenseStore.addExpense({
          description,
          amount: numericAmount,
          groupId,
          paidByUsers: paidBy,
          splits,
        });

        navigation.goBack();
      } catch (e: any) {
        appStore.showInfoModal({
          message:
            e.response?.data?.message || t('add_expense.expense_not_created'),
        });
      }
    }
  }, [navigation, description, amount, groupId, splits, paidBy]);

  const headerButtons: IButtonSettings[] = useMemo(() => {
    return [
      {
        icon: 'arrow-left',
        onPress: navigation.goBack,
      },
      {
        icon: 'check',
        onPress: handleSubmit,
      },
    ] satisfies IButtonSettings[];
  }, [navigation, handleSubmit]);

  return (
    <ScreenWrapper
      title={t('add_expense.create_expense')}
      gradientColors={DEFAULT_GRADIENT_COLORS}
      buttons={headerButtons}>
      <EditExpenseForm
        groupName={group?.name || ''}
        users={participants}
        amount={amount}
        description={description}
        setAmount={setAmount}
        setDescription={setDescription}
        setGroupId={setGroupId}
        splits={splits}
        paidBy={paidBy}
        handleAmountChange={handleAmountChange}
      />
    </ScreenWrapper>
  );
});
