import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {DEFAULT_GRADIENT_COLORS} from '../../constants';
import {useTranslation} from 'react-i18next';
import {GroupDetailsScreenNavigationProps} from '../../navigation/types';
import {Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import expenseStore, {IExpense} from '../../stores/expenseStore';
import {SplittedSwitchButton} from '../../components/splitted-switch-button/SplittedSwitchButton';
import {TransparentItemCard} from '../../components/transparent-item-card/TransparentItemCard';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import groupStore from '../../stores/groupStore';

interface IProps {
  navigation: GroupDetailsScreenNavigationProps['navigation'];
  route: GroupDetailsScreenNavigationProps['route'];
}

const keyExtractor = (item: IExpense) =>
  item.id.toString() + Math.random().toString();

export const GroupDetailsScreen: FC<IProps> = observer(
  ({navigation, route}) => {
    const {groupId} = route.params;
    const group = groupStore?.groups?.get(groupId);
    const expenses = expenseStore?.getExpensesByGroupId(groupId);

    const [activeTab, setActiveTab] = useState(EActiveButton.left);
    const {t} = useTranslation();

    const headerButtons: IButtonSettings[] = useMemo(() => {
      return [
        {
          icon: 'chevron-left',
          onPress: navigation.goBack,
        },
      ];
    }, [navigation, t]);

    const onLeftPress = useCallback(() => {
      setActiveTab(EActiveButton.left);
    }, []);

    const onRightPress = useCallback(() => {
      setActiveTab(EActiveButton.right);
    }, []);

    const onExpenseCardPress = useCallback(
      (id: number) => {
        navigation.navigate('ExpenseDetails', {expenseId: id});
      },
      [navigation],
    );

    const renderItem = useCallback(({item}: {item: IExpense}) => {
      const onItemPress = () => {
        onExpenseCardPress(item.id);
      };

      return (
        <TransparentItemCard
          onPress={onItemPress}
          leftText={item.description}
          rightText={item.amount.toString()}
          width={'80%'}
        />
      );
    }, []);

    //Animation Logic:
    const leftOpacity = useSharedValue(1);
    const rightOpacity = useSharedValue(0);

    useEffect(() => {
      if (activeTab === EActiveButton.left) {
        leftOpacity.value = withTiming(1, {duration: 250});
        rightOpacity.value = withTiming(0, {duration: 250});
      } else {
        leftOpacity.value = withTiming(0, {duration: 250});
        rightOpacity.value = withTiming(1, {duration: 250});
      }
    }, [activeTab]);

    const leftAnimatedStyle = useAnimatedStyle(() => ({
      opacity: leftOpacity.value,
    }));

    const rightAnimatedStyle = useAnimatedStyle(() => ({
      opacity: rightOpacity.value,
    }));

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
            {...{onLeftPress, onRightPress}}
          />
        </View>

        <View style={styles.tabsWrapper}>
          <Animated.View
            style={[styles.tabContent, leftAnimatedStyle]}
            pointerEvents={activeTab === EActiveButton.left ? 'auto' : 'none'}>
            <FlatList
              data={new Array(20).fill(null).map(() => expenses[0])}
              contentContainerStyle={styles.listContainer}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </Animated.View>
          <Animated.View
            style={[styles.tabContent, rightAnimatedStyle]}
            pointerEvents={activeTab === EActiveButton.right ? 'auto' : 'none'}>
            <Text style={styles.balancesText}>балансы</Text>
          </Animated.View>
        </View>
      </ScreenWrapper>
    );
  },
);

export enum EActiveButton {
  left = 'left',
  right = 'right',
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
    paddingBottom: 36,
  },

  switchButtonWrapper: {
    alignItems: 'center',
    marginTop: 24,
  },

  tabsWrapper: {
    flex: 1,
    width: '100%',
  },

  tabContent: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },

  balancesText: {
    marginTop: 20,
    textAlign: 'center',
  },
});
