import React, {FC, useCallback, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {DEFAULT_GRADIENT_COLORS} from '../../constants';
import {useTranslation} from 'react-i18next';
import {GroupDetailsScreenNavigationProps} from '../../navigation/types';
import {FAB, Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import expenseStore, {IExpense} from '../../stores/expenseStore';
import {
  EActiveButton,
  SplittedSwitchButton,
} from '../../components/splitted-switch-button/SplittedSwitchButton';
import {TransparentItemCard} from '../../components/transparent-item-card/TransparentItemCard';
import groupStore from '../../stores/groupStore';
import {colors} from '../../theme/colors';
import {styles} from './styles';
import {useAnimatedTabOpacity} from '../../hooks/use-animated-tab-opacity';

interface IProps {
  navigation: GroupDetailsScreenNavigationProps['navigation'];
  route: GroupDetailsScreenNavigationProps['route'];
}

const keyExtractor = (item: IExpense) => item.id.toString();

export const GroupDetailsScreen: FC<IProps> = observer(
  ({navigation, route}) => {
    const [activeTab, setActiveTab] = useState(EActiveButton.left);
    const {groupId} = route.params;
    const group = groupStore?.groups?.get(groupId);
    const expenses = expenseStore?.getExpensesByGroupId(groupId);

    const {t} = useTranslation();
    const {leftAnimatedStyle, rightAnimatedStyle} =
      useAnimatedTabOpacity(activeTab);

    const onLeftPress = useCallback(() => {
      setActiveTab(EActiveButton.left);
    }, []);

    const onRightPress = useCallback(() => {
      setActiveTab(EActiveButton.right);
    }, []);

    const navigateToExpenseDetails = useCallback(
      (id: number) => {
        navigation.navigate('ExpenseDetails', {expenseId: id});
      },
      [navigation],
    );

    const navigateToAddExpense = useCallback(() => {
      navigation.navigate('AddExpense', {groupId});
    }, [navigation, groupId]);

    const navigateToGroupEdit = useCallback(() => {
      navigation.navigate('EditGroup', {groupId});
    }, [navigation, groupId]);

    const renderItem = useCallback(
      ({item}: {item: IExpense}) => {
        const onItemPress = () => {
          navigateToExpenseDetails(item.id);
        };

        return (
          <TransparentItemCard
            onPress={onItemPress}
            leftText={item.description}
            rightText={item.amount.toString()}
            width={'80%'}
          />
        );
      },
      [navigateToExpenseDetails],
    );

    const headerButtons: IButtonSettings[] = useMemo(() => {
      return [
        {
          icon: 'chevron-left',
          onPress: navigation.goBack,
        },
        {
          icon: 'pen',
          onPress: navigateToGroupEdit,
          size: 28,
        },
      ];
    }, [navigation, navigateToGroupEdit]);

    return (
      <ScreenWrapper
        title={group?.name ?? "Group's name"}
        gradientColors={DEFAULT_GRADIENT_COLORS}
        buttons={headerButtons}>
        <View style={styles.switchButtonWrapper}>
          <SplittedSwitchButton
            active={activeTab}
            containerWidth={'80%'}
            rigthButtonText="балансы"
            leftButtonText="расходы"
            onLeftPress={onLeftPress}
            onRightPress={onRightPress}
          />
        </View>
        <View style={styles.tabsWrapper}>
          <Animated.View
            style={[styles.tabContent, leftAnimatedStyle]}
            pointerEvents={activeTab === EActiveButton.left ? 'auto' : 'none'}>
            <FlatList
              data={expenses}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
          <Animated.View
            style={[styles.tabContent, rightAnimatedStyle]}
            pointerEvents={activeTab === EActiveButton.right ? 'auto' : 'none'}>
            <Text style={styles.balancesText}>балансы</Text>
          </Animated.View>
        </View>
        <FAB
          icon={'plus'}
          label={t('home.create_expense')}
          onPress={navigateToAddExpense}
          visible={true}
          color={colors.blue}
          style={styles.fabStyle}
          variant="tertiary"
        />
      </ScreenWrapper>
    );
  },
);
