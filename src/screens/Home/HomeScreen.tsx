import React, {FC, useCallback} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import authStore from '../../stores/authStore';
import {HomeScreenNavigationProps} from '../../navigation/types';

interface IProps {
  navigation: HomeScreenNavigationProps['navigation'];
}

export const HomeScreen: FC<IProps> = observer(({navigation}) => {
  const navigateToGroupCreate = useCallback(() => {
    navigation.navigate('CreateGroup');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Добро пожаловать, {authStore.user?.name || 'Пользователь'}!
      </Text>
      <Button
        title="Перейти к созданию группы"
        onPress={navigateToGroupCreate}
      />
      <Button title="Выйти" onPress={authStore.logout} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcome: {fontSize: 18, marginBottom: 20},
});
