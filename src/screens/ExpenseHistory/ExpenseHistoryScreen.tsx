import React, {FC, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {ExpenseHistoryScreenNavigationProps} from '../../navigation/types';
import historyStore, {IExpenseHistoryItem} from '../../stores/historyStore';
import {observer} from 'mobx-react-lite';

interface IProps {
  navigation: ExpenseHistoryScreenNavigationProps['navigation'];
  route: ExpenseHistoryScreenNavigationProps['route'];
}

export const ExpenseHistoryScreen: FC<IProps> = observer(({route}) => {
  //   const {expenseId} = route.params;
  const history = historyStore.expensesHistory;

  useEffect(() => {
    historyStore.fetchExpenseHistory();
  }, []);

  const renderItem = ({item}: {item: IExpenseHistoryItem}) => (
    <View style={styles.item}>
      <Text>
        {item.action.toUpperCase()} — {item.user.name}
      </Text>
      <Text>{new Date(item.createdAt).toLocaleString()}</Text>
      {item.previousData && (
        <Text>До: {JSON.stringify(item.previousData)}</Text>
      )}
      {item.newData && <Text>После: {JSON.stringify(item.newData)}</Text>}
    </View>
  );

  return (
    <FlatList
      data={[...history.values()]}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{padding: 16}}
    />
  );
});

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
});
