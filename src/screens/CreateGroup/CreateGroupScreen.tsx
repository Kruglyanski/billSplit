import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import groupStore from '../../stores/groupStore';
import userStore from '../../stores/userStore';
import {CreateGroupScreenNavigationProps} from '../../navigation/types';

interface IProps {
  navigation: CreateGroupScreenNavigationProps['navigation'];
}

export const CreateGroupScreen: FC<IProps> = observer(({navigation}) => {
  const [groupName, setGroupName] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  useEffect(() => {
    userStore.fetchUsers();
  }, []);

  const toggleUser = (userId: string) => {
    setSelectedUserIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId],
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUserIds.length === 0) return;

    await groupStore.createGroup(groupName, selectedUserIds);
    navigation.goBack();
  };

  const renderUser = ({item}: any) => {
    const selected = selectedUserIds.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.userItem, selected && styles.userSelected]}
        onPress={() => toggleUser(item.id)}>
        <Text style={styles.userName}>
          {selected ? '✅ ' : ''}
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Создать группу</Text>

      <TextInput
        style={styles.input}
        placeholder="Название группы"
        value={groupName}
        onChangeText={setGroupName}
      />

      <Text style={styles.subtitle}>Выбери участников:</Text>

      <FlatList
        data={userStore.users}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUser}
        ListEmptyComponent={<Text>Нет доступных пользователей</Text>}
      />

      <Button
        title="Создать группу"
        onPress={handleCreateGroup}
        disabled={!groupName || selectedUserIds.length === 0}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  subtitle: {fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  userSelected: {
    backgroundColor: '#d0f0d0',
  },
  userName: {
    fontSize: 16,
  },
});
