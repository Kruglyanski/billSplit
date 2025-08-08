import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import groupStore from '../../stores/groupStore';
import {GroupDetailsScreenNavigationProps} from '../../navigation/types';
import {TExtraUser} from '../../stores/userStore';

interface IProps {
  navigation: GroupDetailsScreenNavigationProps['navigation'];
  route: GroupDetailsScreenNavigationProps['route'];
}

export const GroupDetailsScreen1: FC<IProps> = observer(
  ({route, navigation}) => {
    const {groupId} = route.params;
    const group = groupStore?.groups?.get(groupId);

    const [name, setName] = useState(group?.name || '');
    const [selectedUserIds, setSelectedUserIds] = useState(
      group?.members.map(m => m.id) || [],
    );
    const [extraUsers, setExtraUsers] = useState<TExtraUser[]>([]);

    const [extraUserEmail, setExtraUserEmail] = useState('');
    const [extraUserName, setExtraUserName] = useState('');

    const allUsers = group?.members || [];

    const toggleUser = (id: number) => {
      setSelectedUserIds(prev => {
        console.log('prev', prev);
        let res;
        if (prev.includes(id)) {
          res = prev.filter(uid => uid !== id);
        } else {
          res = [...prev, id];
        }
        console.log('user res', res);
        return res;
      });
    };

    const addExtraUser = () => {
      if (!extraUserEmail || !extraUserName) {
        Alert.alert(
          'Ошибка',
          'Введите имя и email для дополнительного участника',
        );
        return;
      }
      setExtraUsers(prev => [
        ...prev,
        {email: extraUserEmail, name: extraUserName, registered: false},
      ]);
      setExtraUserEmail('');
      setExtraUserName('');
    };

    const removeExtraUser = (index: number) => {
      setExtraUsers(prev => prev.filter((_, i) => i !== index));
    };

    const onSave = async () => {
      if (group) {
        try {
          await groupStore.updateGroup(group.id, name, selectedUserIds);
          Alert.alert('Успех', 'Группа обновлена');
        } catch (e) {
          Alert.alert('Ошибка', 'Не удалось обновить группу');
        }
      }
    };

    if (!group) {
      return (
        <View style={styles.container}>
          <Text>Группа не найдена</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Название группы:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Название группы"
        />

        <Text style={styles.label}>Участники:</Text>
        <FlatList
          data={allUsers}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.memberItem}
              onPress={() => toggleUser(item.id)}>
              <Text
                style={{
                  ...styles.memberName,
                  fontWeight: selectedUserIds.includes(item.id)
                    ? 'bold'
                    : 'normal',
                }}>
                {item.name}
              </Text>
              <Text style={styles.checkbox}>
                {selectedUserIds.includes(item.id) ? '☑' : '☐'}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>Нет пользователей для выбора</Text>}
        />

        <Text style={styles.label}>Дополнительные участники (email):</Text>
        {extraUsers.map((eu, i) => (
          <View key={i} style={styles.extraUserRow}>
            <Text style={styles.extraUserText}>
              {eu.name} ({eu.email})
            </Text>
            <Button title="Удалить" onPress={() => removeExtraUser(i)} />
          </View>
        ))}
        <View style={styles.extraUserInputRow}>
          <TextInput
            placeholder="Email"
            value={extraUserEmail}
            onChangeText={setExtraUserEmail}
            style={[styles.input, {flex: 1, marginRight: 8}]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Имя"
            value={extraUserName}
            onChangeText={setExtraUserName}
            style={[styles.input, {flex: 1}]}
          />
        </View>
        <Button title="Добавить участника" onPress={addExtraUser} />

        <View style={{marginVertical: 16}}>
          <Button title="Сохранить" onPress={onSave} />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  label: {fontSize: 16, marginBottom: 8, fontWeight: '600'},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  memberName: {fontSize: 16},
  checkbox: {fontSize: 18},
  extraUserRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  extraUserText: {fontSize: 14},
  extraUserInputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
});
