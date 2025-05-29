import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import groupStore from '../../stores/groupStore';
import userStore from '../../stores/userStore';
import {CreateGroupScreenNavigationProps} from '../../navigation/types';

interface IProps {
  navigation: CreateGroupScreenNavigationProps['navigation'];
}

interface IInvitee {
  id?: number;
  name: string;
  email: string;
  registered: boolean;
  selected: boolean;
  existed: boolean;
}

const keyExtractor = (item: IInvitee) => item.email;

export const CreateGroupScreen: FC<IProps> = observer(({navigation}) => {
  const [groupName, setGroupName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [invitees, setInvitees] = useState<Map<string, IInvitee>>(new Map());

  useEffect(() => {
    const newMap = new Map<string, IInvitee>();

    userStore.users.forEach(value => {
      newMap.set(value.email, {...value, selected: false, existed: true});
    });

    if (newMap.size) {
      setInvitees(newMap);
    }
  }, []);

  const addInviteeByEmail = useCallback(async () => {
    const email = emailInput.trim().toLowerCase();
    if (!email) return Alert.alert('Введите email');
    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email); ///TODO: вынести, стандартизировать

    if (!isValidEmail(email)) {
      return Alert.alert('Некорректный email');
    }

    if (invitees.has(email)) {
      return Alert.alert('Пользователь с таким email уже добавлен');
    }

    try {
      const res = await userStore.fetchUserByEmail(email);

      setInvitees(prev => {
        const newMap = new Map(prev);
        if (res) {
          newMap.set(res.email, {
            ...res,
            selected: false,
            existed: true,
          });
        } else {
          newMap.set(email, {
            name: '',
            email,
            registered: false,
            selected: false,
            existed: false,
          });
        }

        return newMap;
      });

      setEmailInput('');
    } catch (error) {
      Alert.alert('Ошибка при добавлении пользователя');
      console.error(error);
    }
  }, [invitees, emailInput]);

  const updateInviteeName = useCallback((email: string, newName: string) => {
    setInvitees(prev => {
      const item = prev.get(email);
      if (!item) return prev;

      const newItem = {...item, name: newName};
      const newMap = new Map(prev);
      newMap.set(email, newItem);

      return newMap;
    });
  }, []);

  const toggleInviteeSelected = useCallback((email: string) => {
    setInvitees(prev => {
      const item = prev.get(email);
      if (!item) return prev;

      const newItem = {...item, selected: !item.selected};
      const newMap = new Map(prev);
      newMap.set(email, newItem);

      return newMap;
    });
  }, []);

  const handleCreateGroup = useCallback(async () => {
    if (!groupName.trim()) {
      return Alert.alert('Введите название группы');
    }

    const selectedInvitees = [...invitees.values()].filter(i => i.selected);

    if (selectedInvitees.length === 0) {
      return Alert.alert('Выберите участников группы');
    }

    for (const u of selectedInvitees) {
      if (!u.registered && !u.name.trim()) {
        return Alert.alert(
          'Введите имя для всех незарегистрированных пользователей',
        );
      }
    }

    const userIds = selectedInvitees.filter(u => u.registered).map(u => u.id!);

    const extraUsers = selectedInvitees.filter(u => !u.existed);

    try {
      const groupId = await groupStore.createGroup(
        groupName.trim(),
        userIds,
        extraUsers,
      );

      setGroupName('');
      setInvitees(new Map());

      if (groupId) {
        // navigation.navigate('HomeTab', {screen: 'CreateGroup'});
        navigation.navigate('GroupDetails', {groupId});
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }, [groupName, invitees, navigation]);

  const renderItem = useCallback(
    ({item}: {item: IInvitee}) => {
      return (
        <TouchableOpacity
          style={[styles.userItem, item.selected && styles.userSelected]}
          onPress={() => toggleInviteeSelected(item.email)}>
          <Text style={styles.userName}>
            {item.selected ? '✅ ' : ''}
            {item.name || '[Введите имя]'}
          </Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          {!item.registered && (
            <TextInput
              placeholder="Введите имя"
              style={styles.inputSmall}
              value={item.name}
              onChangeText={text => updateInviteeName(item.email, text)}
            />
          )}
        </TouchableOpacity>
      );
    },
    [toggleInviteeSelected, updateInviteeName],
  );

  const inviteesArray = useMemo(() => [...invitees.values()], [invitees]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Создать группу</Text>

      <TextInput
        style={styles.input}
        placeholder="Название группы"
        value={groupName}
        onChangeText={setGroupName}
      />

      <View style={styles.addEmailContainer}>
        <TextInput
          style={styles.inputEmail}
          placeholder="Введите email для добавления"
          value={emailInput}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmailInput}
        />
        <Button title="Добавить" onPress={addInviteeByEmail} />
      </View>

      <Text style={styles.subtitle}>Участники группы:</Text>

      <FlatList
        data={inviteesArray}
        {...{renderItem, keyExtractor}}
        ListEmptyComponent={<Text>Нет участников</Text>}
        showsVerticalScrollIndicator={false}
      />

      <Button title="Создать группу" onPress={handleCreateGroup} />
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
  addEmailContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  inputEmail: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    borderRadius: 6,
    marginTop: 4,
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
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});
