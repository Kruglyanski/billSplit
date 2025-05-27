import React, {FC, useCallback, useEffect, useMemo} from 'react';
import {FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';
import {FAB, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import authStore from '../../stores/authStore';
import {HomeScreenNavigationProps} from '../../navigation/types';
import userStore from '../../stores/userStore';
import {colors} from '../../theme/colors';
import expenseStore, {IExpense} from '../../stores/expenseStore';
import groupStore from '../../stores/groupStore';
import {ItemCard} from '../../components/item-card/ItemCard';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {styles} from './styles';

interface IProps {
  navigation: HomeScreenNavigationProps['navigation'];
}

const GRADIENT_COLORS = [colors.orange, colors.white];

const COLOR_PALLETE = [
  colors.blue,
  colors.orange,
  colors.green,
  colors.violet,
  colors.lightRed,
  colors.yellow,
];

const keyExtractor = (item: IExpense) => item.id.toString();

export const HomeScreen: FC<IProps> = observer(({navigation}) => {
  const {t} = useTranslation();

  useEffect(() => {
    userStore.fetchUsers();
    expenseStore.fetchExpensesByUser();
    groupStore.fetchUserGroups();
  }, []);

  const navigateToGroupCreate = useCallback(() => {
    navigation.navigate('HomeTab', {screen: 'CreateGroup'});
  }, [navigation]);

  const navigateToGroupList = useCallback(() => {
    navigation.navigate('GroupListTab', {screen: 'GroupList'});
  }, [navigation]);

  const navigateToAddExpense = useCallback(() => {
    navigation.navigate('HomeTab', {screen: 'AddExpense', params: {}});
  }, [navigation]);

  // const logOut = useCallback(() => {
  //   authStore.logout();
  //   navigation.navigate('Auth');
  // }, [navigation]);

  // const showLogoutModal = useCallback(() => {
  //   appStore.showInfoModal({
  //     message: t('home.logout_message'),
  //     title: t('home.attention'),
  //     action: logOut,
  //   });
  // }, [logOut]);

  const renderItem = useCallback(
    ({item, index}: {item: IExpense; index: number}) => {
      const color = COLOR_PALLETE[index % COLOR_PALLETE.length];

      const onPress = () =>
        navigation.navigate('HomeTab', {
          screen: 'ExpenseDetails',
          params: {expenseId: item.id},
        });

      return (
        <ItemCard
          title={item.description}
          createdAt={item.createdAt}
          {...{onPress, color}}
        />
      );
    },
    [],
  );

  const headerButtons: IButtonSettings[] = useMemo(() => {
    return [
      {icon: 'plus', title: t('home.event'), onPress: navigateToGroupCreate},
      {title: t('home.go_to_groups'), onPress: navigateToGroupList},
    ];
  }, [navigateToGroupCreate, navigateToGroupCreate, t]);

  return (
    <ScreenWrapper
      title={`${t('home.welcome')}, ${authStore.user?.name || t('home.user')}!`}
      gradientColors={GRADIENT_COLORS}
      buttons={headerButtons}>
      <Text variant="headlineSmall" style={styles.listHeader}>
        {t('home.current_expenses')}:
      </Text>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={[...expenseStore.expenses.values()]}
        showsVerticalScrollIndicator={false}
        {...{renderItem, keyExtractor}}></FlatList>
      <FAB
        icon={'plus'}
        label={t('home.create_expense')}
        onPress={navigateToAddExpense}
        visible={true}
        color={colors.violet}
        style={styles.fabStyle}
        variant="tertiary"
      />
    </ScreenWrapper>
  );
});

{
  /* <Button
style={styles.logout}
mode="text"
onPress={showLogoutModal}
icon="logout"
textColor={colors.darkGray}>
{t('home.logout')}
</Button> */
}
