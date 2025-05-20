import React, {FC} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import groupStore from '../../stores/groupStore';
import {GroupListScreenNavigationProps} from '../../navigation/types';

interface IProps {
  navigation: GroupListScreenNavigationProps['navigation'];
}

export const GroupListScreen: FC<IProps> = observer(({navigation}) => {
  const renderItem = (
    {item}: any, //TODO: вынести
  ) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => {
        navigation.navigate('GroupDetails', {groupId: item.id});
      }}>
      <Text style={styles.groupName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мои группы</Text>
      <FlatList
        data={groupStore.groups}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Группы не найдены</Text>}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  groupItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  groupName: {fontSize: 18},
});
