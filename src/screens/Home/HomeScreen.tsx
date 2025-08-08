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
import {ColoredItemCard} from '../../components/colored-item-card/ColoredItemCard';
import {ScreenWrapper} from '../../components/screen-wrapper/ScreenWrapper';
import {styles} from './styles';
import {getColorById} from '../../utils/helpers/get-color-by-id';
import {DEFAULT_GRADIENT_COLORS} from '../../constants';

interface IProps {
  navigation: HomeScreenNavigationProps['navigation'];
}

const keyExtractor = (item: IExpense) => item.id.toString();

export const HomeScreen: FC<IProps> = observer(({navigation}) => {
  const {t} = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      await expenseStore.fetchExpensesByUser();
      userStore.fetchRelatedUsers();
      groupStore.fetchUserGroups();
    };

    fetchData();
  }, []);

  const navigateToAddExpense = useCallback(() => {
    navigation.navigate('HomeTab', {screen: 'AddExpense', params: {}});
  }, [navigation]);

  const renderItem = useCallback(({item}: {item: IExpense}) => {
    const color = getColorById(item.id);

    const onPress = () =>
      navigation.navigate('HomeTab', {
        screen: 'ExpenseDetails',
        params: {expenseId: item.id},
      });

    return (
      <ColoredItemCard
        title={item.description}
        createdAt={item.createdAt}
        {...{onPress, color}}
      />
    );
  }, []);

  return (
    <ScreenWrapper
      title={`${t('home.welcome')}, ${authStore.user?.name || t('home.user')}!`}
      gradientColors={DEFAULT_GRADIENT_COLORS}>
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
