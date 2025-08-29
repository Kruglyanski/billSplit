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
import groupStore from '../../stores/groupStore';
import {styles} from './styles';
import {DEFAULT_GRADIENT_COLORS} from '../../constants';
import {EditExpenseFormUsersList} from '../../components/edit-expense-form/EditExpenseFormUsersList';

type TProps = ExpenseDetailsScreenNavigationProps;

export const ExpenseDetailsScreen: FC<TProps> = observer(
  ({route, navigation}) => {
    const {expenseId} = route.params;
    const expense = expenseStore.expenses.get(expenseId);
    const group = expense ? groupStore.groups.get(expense.group.id) : undefined;
    const {t, i18n} = useTranslation();

    const navigateToExpenseEdit = useCallback(() => {
      navigation.navigate('EditExpense', {expenseId});
    }, [navigation, expenseId]);

    const headerButtons: IButtonSettings[] = useMemo(() => {
      const backButton = {
        icon: 'chevron-left',
        onPress: navigation.goBack,
      };

      if (!expense) {
        return [backButton];
      }

      return [
        backButton,
        {
          icon: 'pen',
          onPress: navigateToExpenseEdit,
          size: 28,
        },
      ];
    }, [navigation, navigateToExpenseEdit, expense]);

    return (
      <ScreenWrapper
        title={expense?.description || t('details.expense_not_found')}
        gradientColors={DEFAULT_GRADIENT_COLORS}
        buttons={headerButtons}>
        {!expense ? (
          <View style={styles.noExpense}>
            <Text style={styles.textWhite} variant="headlineMedium">
              {t('details.expense_not_found')}!
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <Text style={styles.sectionTitle}>{t('details.event')}:</Text>
            <Text style={styles.textWhite}>{group?.name || '—'}</Text>
            <Text style={styles.sectionTitle}>{t('details.date')}:</Text>
            <Text style={styles.textWhite}>
              {new Date(expense.createdAt).toLocaleDateString(
                `${i18n.language}`,
                {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                },
              )}
            </Text>
            <Text style={styles.sectionTitle}>{t('details.amount')}:</Text>
            <Text style={styles.textWhite}>{expense.amount}</Text>
            {!!group?.members.length && (
              <EditExpenseFormUsersList
                splits={expense.splits}
                paidBy={expense.paidBy}
                users={group?.members}
              />
            )}
          </ScrollView>
        )}
      </ScreenWrapper>
    );
  },
);
