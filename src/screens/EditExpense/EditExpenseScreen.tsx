import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import expenseStore, {TSplitPaidBy} from '../../stores/expenseStore';
import groupStore from '../../stores/groupStore';
import {EditExpenseScreenNavigationProps} from '../../navigation/types';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {appStore} from '../../stores/appStore';
import {colors} from '../../theme/colors';
import {EditExpenseForm} from '../../components/edit-expense-form/EditExpenseForm';

const GRADIENT_COLORS = [colors.green, colors.white];

interface IProps extends EditExpenseScreenNavigationProps {}

export const EditExpenseScreen: FC<IProps> = observer(({route, navigation}) => {
  const {expenseId} = route.params;
  const {t} = useTranslation();

  const expense = expenseStore.expenses.get(expenseId);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [groupId, setGroupId] = useState<number | null>(null);
  const [splits, setSplits] = useState<TSplitPaidBy[]>([]);
  const [paidBy, setPaidBy] = useState<TSplitPaidBy[]>([]);

  useEffect(() => {
    if (expense) {
      setDescription(expense.description);
      setAmount(expense.amount?.toString());
      setGroupId(expense.group?.id);
      setSplits(expense.splits);
      setPaidBy(expense.paidBy);
    }
  }, [expense]);

  const handleAmountChange = useCallback(
    (userId: number, value: string, type: 'paid' | 'split') => {
      const amountValue = +value;
      const setters = {
        paid: setPaidBy,
        split: setSplits,
      };
      setters[type](prev =>
        prev.map(s => (s.userId === userId ? {...s, amount: amountValue} : s)),
      );
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (!description || !amount || !groupId) {
      appStore.showInfoModal({
        message: t('add_expense.fill_all_fields'),
      });
      return;
    }

    const numAmount = +amount;
    if (isNaN(numAmount) || numAmount <= 0) {
      appStore.showInfoModal({
        message: t('add_expense.sum_must_be_positive'),
      });
      return;
    }

    const paidSum = paidBy.reduce((sum, p) => sum + p.amount, 0);
    if (paidSum !== numAmount) {
      appStore.showInfoModal({
        message: t('add_expense.sums_must_be_equal', {
          paidSum,
          amount,
        }),
      });
      return;
    }

    try {
      await expenseStore.updateExpense(expenseId, {
        description,
        amount: numAmount,
        groupId,
        splits,
        paidBy,
      });
      navigation.goBack();
    } catch (e: any) {
      appStore.showInfoModal({
        message:
          e.response?.data?.message || t('add_expense.expense_not_created'),
      });
    }
  }, [description, amount, groupId, splits, paidBy, expenseId, navigation, t]);

  const deleteExpense = useCallback(async () => {
    try {
      await expenseStore.deleteExpense(expenseId);
      navigation.goBack();
    } catch {
      appStore.showInfoModal({
        message: t('add_expense.delete_expense_error'),
      });
    }
  }, [expenseId, navigation, t]);

  const handleDelete = useCallback(() => {
    appStore.showInfoModal({
      title: t('add_expense.delete_expense'),
      message: t('add_expense.delete_expense_description'),
      action: () => {
        deleteExpense();
        appStore.hideInfoModal();
      },
    });
  }, [deleteExpense, t]);

  const headerButtons: IButtonSettings[] = useMemo(() => {
    return [
      {
        icon: 'chevron-left',
        onPress: navigation.goBack,
      },
      {icon: 'delete', onPress: handleDelete, size: 28, iconColor: colors.red},
    ];
  }, [navigation, handleSubmit, t]);

  if (!expense || groupId === null) {
    return <></>;
  }

  const group = groupStore.groups.get(groupId);
  const participants = group?.members || [];

  return (
    <ScreenWrapper
      title={t('add_expense.edit_expense')}
      gradientColors={GRADIENT_COLORS}
      buttons={headerButtons}>
      <EditExpenseForm
        groupName={group?.name || ''}
        users={participants}
        {...{
          amount,
          splits,
          paidBy,
          description,
          setDescription,
          setAmount,
          setGroupId,
          handleAmountChange,
          handleSubmit,
        }}
      />
    </ScreenWrapper>
  );
});
