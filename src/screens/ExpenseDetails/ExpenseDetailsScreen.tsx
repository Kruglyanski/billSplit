import React, {FC} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {observer} from 'mobx-react-lite';
import expenseStore from '../../stores/expenseStore';
import userStore from '../../stores/userStore';
import {
  EExpenseActionType,
  ExpenseDetailsScreenNavigationProps,
} from '../../navigation/types';
import dayjs from 'dayjs';

interface IProps {
  route: ExpenseDetailsScreenNavigationProps['route'];
  navigation: ExpenseDetailsScreenNavigationProps['navigation'];
}

export const ExpenseDetailsScreen: FC<IProps> = observer(
  ({navigation, route}) => {
    const {expenseId} = route.params;
    const expense = expenseStore.expenses.get(expenseId);

    if (!expense) {
      return (
        <View style={styles.container}>
          <Text>Расход не найден</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{expense.description}</Text>
        <Text style={styles.label}>Сумма: {expense.amount} ₽</Text>
        <Text style={styles.label}>Заплатили: </Text>
        {expense.paidBy.map(
          (
            pay, //!!!!!!!!!!вынести
          ) => (
            <Text key={pay.id} style={styles.splitItem}>
              • {userStore.users.get(pay.userId)?.name ?? ''}: {pay.amount} ₽
            </Text>
          ),
        )}
        <Text style={styles.label}>Группа: {expense.group?.name || '—'}</Text>
        <Text style={styles.label}>
          Дата: {dayjs(expense.createdAt).format('DD.MM.YYYY HH:mm')}
        </Text>

        <Text style={styles.sectionTitle}>Распределение:</Text>
        {expense.splits.map(
          (
            split, //!!!!!!вынести
          ) => (
            <Text key={split.id} style={styles.splitItem}>
              • {userStore.users.get(split.userId)?.name ?? ''}: {split.amount}{' '}
              ₽
            </Text>
          ),
        )}
        <Button
          title="Редактировать"
          onPress={() =>
            navigation.navigate('AddExpense', {
              expenseId: expense.id,
              actionType: EExpenseActionType.EDIT,
            })
          }
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  label: {fontSize: 16, marginBottom: 8},
  sectionTitle: {fontSize: 18, marginTop: 16, fontWeight: '600'},
  splitItem: {fontSize: 16, marginLeft: 8},
});
