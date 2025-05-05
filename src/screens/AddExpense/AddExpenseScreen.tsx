import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import expenseStore from '../../stores/expenseStore';
import authStore from '../../stores/authStore';
import groupStore from '../../stores/groupStore';
import {AddExpenseScreenNavigationProps} from '../../navigation/types';

interface IProps {
  route: AddExpenseScreenNavigationProps['route'];
  navigation: AddExpenseScreenNavigationProps['navigation'];
}

const AddExpenseScreen: FC<IProps> = observer(({route, navigation}) => {
  const {groupId} = route.params;

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [splits, setSplits] = useState<{userId: number; amount: number}[]>([]);

  const group = groupStore.groups.find(g => g.id === groupId);
  const participants = group?.members || [];

  const handleSplitChange = (userId: number, value: string) => {
    const numeric = parseFloat(value) || 0;
    setSplits(prev => {
      const existing = prev.find(s => s.userId === userId);
      if (existing) {
        return prev.map(s =>
          s.userId === userId ? {...s, amount: numeric} : s,
        );
      } else {
        return [...prev, {userId, amount: numeric}];
      }
    });
  };

  const handleSubmit = async () => {
    if (!description || !amount) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Ошибка', 'Сумма должна быть положительным числом');
      return;
    }

    try {
      await expenseStore.addExpense({
        description,
        amount: numericAmount,
        groupId,
        paidByUserId: authStore.user!.id,
        splits,
      });

      navigation.goBack();
    } catch (e: any) {
      Alert.alert(
        'Ошибка',
        e.response?.data?.message || 'Не удалось создать расход',
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Описание"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Сумма"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <Text style={styles.label}>Распределение:</Text>
      {participants.map(user => (
        <View key={user.id} style={styles.splitRow}>
          <Text style={styles.userName}>{user.name}</Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            style={styles.splitInput}
            onChangeText={value => handleSplitChange(user.id, value)}
          />
        </View>
      ))}

      <Button title="Добавить расход" onPress={handleSubmit} />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {padding: 16},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
  },
  label: {fontSize: 16, fontWeight: 'bold', marginBottom: 8},
  splitRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  userName: {flex: 1},
  splitInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    width: 80,
    borderRadius: 4,
    textAlign: 'right',
  },
});

export default AddExpenseScreen;
