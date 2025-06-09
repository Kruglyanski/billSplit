import React, {FC, useCallback, useMemo} from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import groupStore, {IGroup} from '../../stores/groupStore';
import {GroupListScreenNavigationProps} from '../../navigation/types';
import {colors} from '../../theme/colors';
import {ItemCard} from '../../components/item-card/ItemCard';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {styles} from './styles';

interface IProps {
  navigation: GroupListScreenNavigationProps['navigation'];
}
const keyExtractor = (item: IGroup) => item.id.toString();

const GRADIENT_COLORS = [colors.violet, colors.white];

const COLOR_PALLETE = [
  colors.blue,
  colors.orange,
  colors.green,
  colors.violet,
  colors.lightRed,
  colors.yellow,
];

export const GroupListScreen: FC<IProps> = observer(({navigation}) => {
  const {t} = useTranslation();

  const navigateToGroupCreate = useCallback(() => {
    navigation.navigate('GroupListTab', {screen: 'CreateGroup'});
  }, [navigation]);

  const renderItem = useCallback(
    ({item, index}: {item: IGroup; index: number}) => {
      const color = COLOR_PALLETE[index % COLOR_PALLETE.length];

      const onPress = () =>
        navigation.navigate('GroupListTab', {
          screen: 'GroupDetails',
          params: {groupId: item.id},
        });

      return (
        <ItemCard
          title={item?.name || ''}
          createdAt={item?.createdAt || ''}
          {...{onPress, color}}
        />
      );
    },
    [],
  );

  const headerButtons: IButtonSettings[] = useMemo(() => {
    return [
      {
        icon: 'arrow-left',
        title: t('event_list.back'),
        onPress: navigation.goBack,
      },
      {
        icon: 'plus',
        title: t('event_list.add'),
        onPress: navigateToGroupCreate,
      },
    ];
  }, [navigation, navigateToGroupCreate, t]);

  return (
    <ScreenWrapper
      title={t('event_list.title')}
      gradientColors={GRADIENT_COLORS}
      buttons={headerButtons}>
      <FlatList
        style={styles.list}
        data={[...groupStore.groups.values()]}
        showsVerticalScrollIndicator={false}
        {...{keyExtractor, renderItem}}
        ListEmptyComponent={
          <View style={styles.noEvents}>
            <Text style={styles.textWhite} variant="headlineMedium">
              {t('details.expense_not_found')}!
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
});
