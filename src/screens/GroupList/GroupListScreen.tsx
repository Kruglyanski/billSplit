import React, {FC, useCallback, useMemo} from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import groupStore, {IGroup} from '../../stores/groupStore';
import {GroupListScreenNavigationProps} from '../../navigation/types';
import {ColoredItemCard} from '../../components/colored-item-card/ColoredItemCard';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {styles} from './styles';
import {DEFAULT_GRADIENT_COLORS} from '../../constants';
import {getColorById} from '../../utils/helpers/get-color-by-id';

interface IProps {
  navigation: GroupListScreenNavigationProps['navigation'];
}

const keyExtractor = (item: IGroup) => item.id.toString();

export const GroupListScreen: FC<IProps> = observer(({navigation}) => {
  const {t} = useTranslation();

  const navigateToGroupCreate = useCallback(() => {
    navigation.navigate('GroupListTab', {screen: 'CreateGroup'});
  }, [navigation]);

  const renderItem = useCallback(({item}: {item: IGroup; index: number}) => {
    const color = getColorById(item.id);

    const onPress = () =>
      navigation.navigate('GroupListTab', {
        screen: 'GroupDetails',
        params: {groupId: item.id},
      });

    return (
      <ColoredItemCard
        title={item?.name || ''}
        // createdAt={item?.createdAt || ''}
        {...{onPress, color}}
      />
    );
  }, []);

  const headerButtons: IButtonSettings[] = useMemo(() => {
    return [
      {
        icon: 'chevron-left',
        onPress: navigation.goBack,
      },
      {
        icon: 'plus',
        onPress: navigateToGroupCreate,
        size: 34,
      },
    ];
  }, [navigation, navigateToGroupCreate]);

  return (
    <ScreenWrapper
      title={t('event_list.title')}
      gradientColors={DEFAULT_GRADIENT_COLORS}
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
