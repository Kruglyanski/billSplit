import React, {FC, useCallback, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import expenseStore, {TSplitPaidBy} from '../../stores/expenseStore';
import groupStore from '../../stores/groupStore';
import {AddExpenseScreenNavigationProps} from '../../navigation/types';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {colors} from '../../theme/colors';
import {appStore} from '../../stores/appStore';
import {EditExpenseForm} from '../../components/edit-expense-form/EditExpenseForm';

interface IProps extends AddExpenseScreenNavigationProps {}

const GRADIENT_COLORS = [colors.green, colors.white];

export const AddExpenseScreen: FC<IProps> = observer(({route, navigation}) => {
  const {groupId: paramGroupId} = route.params;

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [groupId, setGroupId] = useState(paramGroupId || null);

  const group =  groupStore.groups.get(groupId || -1);

  const {t} = useTranslation();

  const participants = group?.members || [];

  const [splits, setSplits] = useState<TSplitPaidBy[]>(() =>
    participants.map(p => ({userId: p.id, amount: 0})),
  );
  const [paidBy, setPaidBy] = useState<TSplitPaidBy[]>(() =>
    participants.map(p => ({userId: p.id, amount: 0})),
  );

  const handleAmountChange = useCallback(
    (userId: number, value: string, type: 'paid' | 'split') => {
      const amount = +value;

      const setters = {
        paid: setPaidBy,
        split: setSplits,
      };

      setters[type](prev => {
        const existing = prev.find(s => s.userId === userId);
        return existing
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

    const numericAmount = +amount;

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
        title: t('add_expense.back'),
        onPress: navigation.goBack,
      },
      {title: t('add_expense.add'), onPress: handleSubmit},
    ];
  }, [navigation, handleSubmit, t]);

  return (
    <ScreenWrapper
      title={t('add_expense.create_expense')}
      gradientColors={GRADIENT_COLORS}
      buttons={headerButtons}>
      <EditExpenseForm
        groupName={group?.name || ''}
        users={participants}
        {...{
          handleAmountChange,
          setGroupId,
          setAmount,
          setDescription,
          splits,
          paidBy,
          amount,
          description,
        }}
      />
    </ScreenWrapper>
  );
});
