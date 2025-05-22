import React, {FC, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {GroupBalanceScreenNavigationProps} from '../../navigation/types';
import groupStore from '../../stores/groupStore';
import {observer} from 'mobx-react-lite';

interface IProps {
  navigation: GroupBalanceScreenNavigationProps['navigation'];
  route: GroupBalanceScreenNavigationProps['route'];
}

export const GroupBalanceScreen: FC<IProps> = observer(({route}) => {
  const groupId = route.params?.groupId;

  const data = groupStore.debtResult;

  useEffect(() => {
    groupStore.fetchBalance(groupId);
  }, [groupId]);

  if (!data) return <Text>Загрузка...</Text>;

  return (
    <View style={{padding: 16}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>
        Моя позиция
      </Text>
      <Text>Вы должны: {data.myPosition.totalOwed} ₽</Text>
      <Text>Вам должны: {data.myPosition.totalToReceive} ₽</Text>
      <Text>Итог: {data.myPosition.netBalance} ₽</Text>

      <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 12}}>
        Балансы участников
      </Text>
      {data.balances.map(b => (
        <Text key={b.userId}>
          {b.userName}: {b.balance} ₽
        </Text>
      ))}

      <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 12}}>
        Кто кому должен
      </Text>
      <FlatList
        data={data.transactions}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => (
          <Text>
            {item.fromUserName} → {item.toUserName}: {item.amount} ₽
          </Text>
        )}
      />
    </View>
  );
});
