import React, {FC, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {observer} from 'mobx-react-lite';
import groupStore from '../../stores/groupStore';
import expenseStore from '../../stores/expenseStore';
import {GroupDetailScreenNavigationProps} from '../../navigation/types';

interface IProps {
  navigation: GroupDetailScreenNavigationProps['navigation'];
  route: GroupDetailScreenNavigationProps['route'];
}

export const GroupDetailsScreen: FC<IProps> = observer(
  ({route, navigation}) => {
    const {groupId} = route.params;
    const group = groupStore.groups.find(g => g.id === groupId);

    useEffect(() => {
      if (group) {
        expenseStore.fetchExpenses(group.id);
      }
    }, [group]);

    if (!group) {
      return (
        <View style={styles.container}>
          <Text>Группа не найдена</Text>
        </View>
      );
    }

    const renderExpense = (
      {item}: any, //Вынести в компонент
    ) => (
      <View style={styles.expenseItem}>
        <Text style={styles.expenseDesc}>{item.description}</Text>
        <Text style={styles.expenseAmount}>{item.amount} ₽</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{group.name}</Text>

        <Text style={styles.sectionTitle}>Участники:</Text>
        {group.members.map(renderMember)}

        <Text style={styles.sectionTitle}>Расходы:</Text>
        <FlatList
          data={expenseStore.expenses.filter(e => e.groupId === group.id)}
          keyExtractor={item => item.id.toString()}
          renderItem={renderExpense}
          ListEmptyComponent={<Text>Нет расходов</Text>}
        />

        <Button
          title="Добавить расход"
          onPress={() => navigation.navigate('AddExpense', {groupId: group.id})}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  sectionTitle: {fontSize: 18, marginTop: 16, fontWeight: '600'},
  member: {fontSize: 16},
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  expenseDesc: {fontSize: 16},
  expenseAmount: {fontSize: 16, fontWeight: 'bold'},
});
