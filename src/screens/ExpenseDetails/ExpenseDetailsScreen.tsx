import React, {FC, useCallback, useMemo} from 'react';
import {View, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import expenseStore from '../../stores/expenseStore';
import {ExpenseDetailsScreenNavigationProps} from '../../navigation/types';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {colors} from '../../theme/colors';
import {ExpenseDetailsUserList} from '../../components/expense-details-user-list/ExpenseDetailsUserList';
import groupStore from '../../stores/groupStore';
import {styles} from './styles';

type TProps = ExpenseDetailsScreenNavigationProps & {};
const GRADIENT_COLORS = [colors.blue, colors.white];

export const ExpenseDetailsScreen: FC<TProps> = observer(
  ({route, navigation}) => {
    const {expenseId} = route.params;
    const expense = expenseStore.expenses.get(expenseId);
    const group = groupStore.groups.find(g => g.id === expense?.group.id);
    const {t} = useTranslation();

    const navigateToExpenseEdit = useCallback(() => {
      navigation.navigate('EditExpense', {expenseId});
    }, [navigation, expenseId]);

    const headerButtons: IButtonSettings[] = useMemo(() => {
      return [
        {
          icon: 'arrow-left',
          title: t('details.back'),
          onPress: navigation.goBack,
        },
        {
          title: t('details.edit'),
          onPress: expense ? navigateToExpenseEdit : undefined,
        },
      ];
    }, [navigation, expense, navigateToExpenseEdit, t]);

    return (
      <ScreenWrapper
        title={expense?.description || ''}
        gradientColors={GRADIENT_COLORS}
        buttons={headerButtons}>
        {!expense ? (
          <View style={styles.noExpense}>
            <Text style={styles.textWhite} variant="headlineMedium">
              {t('details.expense_not_found')}!
            </Text>
          </View>
        ) : (
          <ScrollView>
            <Text style={styles.amount} variant="bodyLarge">
              {t('details.amount')}: {expense.amount}
            </Text>
            <Text style={styles.event} variant="bodyLarge">
              {t('details.event')}: {expense.group.name}
            </Text>
            <ExpenseDetailsUserList
              users={group?.members || []}
              paidBy={expense.paidBy}
              splits={expense.splits}
            />
          </ScrollView>
        )}
      </ScreenWrapper>
    );
  },
);
