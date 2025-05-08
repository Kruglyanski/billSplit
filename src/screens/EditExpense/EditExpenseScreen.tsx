import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import expenseStore from '../../stores/expenseStore';
import groupStore from '../../stores/groupStore';
import {EditExpenseScreenNavigationProps} from '../../navigation/types';
import userStore from '../../stores/userStore';

interface IProps {
  navigation: EditExpenseScreenNavigationProps['navigation'];
  route: EditExpenseScreenNavigationProps['route'];
}

export const EditExpenseScreen: FC<IProps> = observer(({route, navigation}) => {
  const {expenseId} = route.params;
  const expense = expenseStore.expenses.get(expenseId);

  const [description, setDescription] = useState(expense?.description ?? '');
  const [amount, setAmount] = useState(String(expense?.amount ?? ''));
  const [groupId, setGroupId] = useState(expense?.group?.id ?? null);
  const [splits, setSplits] = useState(
    expense?.splits?.map(s => ({userId: s.userId, amount: s.amount})) ?? [],
  );
  const [paidBy, setPaidBy] = useState(
    expense?.paidBy?.map(p => ({userId: p.userId, amount: p.amount})) ?? [],
  );
  const [modalVisible, setModalVisible] = useState(false);

  const currentGroup = groupStore.groups.find(g => g.id === groupId);

  const handleSave = async () => {
    if (!expense) return;
    try {
      await expenseStore.updateExpense(expense.id, {
        description,
        amount: parseFloat(amount),
        groupId,
        splits,
        paidBy,
      });
      navigation.goBack();
    } catch (error) {
      console.log('upd error', error);
    }
  };

  const renderGroupItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => {
        setGroupId(item.id);
        setModalVisible(false);
      }}>
      <Text style={{fontSize: 16}}>{item.name}</Text>
    </TouchableOpacity>
  );

  const updateSplitAmount = (userId: number, value: string) => {
    setSplits(prev =>
      prev.map(split =>
        split.userId === userId
          ? {...split, amount: parseFloat(value) || 0}
          : split,
      ),
    );
  };

  const updatePaidAmount = (userId: number, value: string) => {
    setPaidBy(prev =>
      prev.map(payer =>
        payer.userId === userId
          ? {...payer, amount: parseFloat(value) || 0}
          : payer,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Описание</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Text style={styles.label}>Сумма</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Группа</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.groupSelector}>
          {currentGroup?.name || 'Выберите группу'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Доли участников</Text>
      {splits.map(split => {
        const member = userStore.users.get(split.userId);
        return (
          <View key={split.userId} style={styles.splitItem}>
            <Text style={{flex: 1}}>{member?.name || '—'}</Text>
            <TextInput
              style={[styles.input, {flex: 1}]}
              value={split.amount.toString()}
              onChangeText={v => updateSplitAmount(split.userId, v)}
              keyboardType="numeric"
            />
          </View>
        );
      })}

      <Text style={styles.label}>Заплачено участниками</Text>
      {paidBy.map(payer => {
        const member = userStore.users.get(payer.userId);
        return (
          <View key={payer.userId} style={styles.splitItem}>
            <Text style={{flex: 1}}>{member?.name || '—'}</Text>
            <TextInput
              style={[styles.input, {flex: 1}]}
              value={payer.amount.toString()}
              onChangeText={v => updatePaidAmount(payer.userId, v)}
              keyboardType="numeric"
            />
          </View>
        );
      })}

      <Button title="Сохранить изменения" onPress={handleSave} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Выберите группу</Text>
          <FlatList
            data={groupStore.groups}
            keyExtractor={item => item.id.toString()}
            renderItem={renderGroupItem}
          />
          <Button title="Закрыть" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  label: {fontSize: 16, marginTop: 12},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
    fontSize: 16,
  },
  groupSelector: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#eee',
    marginVertical: 10,
    borderRadius: 6,
  },
  modalContent: {flex: 1, padding: 16},
  modalTitle: {fontSize: 20, fontWeight: 'bold', marginBottom: 16},
  groupItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  splitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
});
