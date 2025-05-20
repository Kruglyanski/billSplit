import {FC, memo, useCallback} from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import dayjs from 'dayjs';
import {HomeScreenNavigationProps} from '../../navigation/types';
import {styles} from './styles';

interface IProps {
  title: string;
  createdAt: string;
  color: string;
  id: number;
  navigation: HomeScreenNavigationProps['navigation'];
}

export const ExpenseCard: FC<IProps> = memo(
  ({title, createdAt, color, id, navigation}) => {
    const onPress = useCallback(() => {
      navigation.navigate('ExpenseDetails', {expenseId: id});
    }, [navigation, id]);

    const date = dayjs(createdAt).format('DD.MM.YYYY HH:mm');

    return (
      <Card style={[styles.card, {backgroundColor: color}]} {...{onPress}}>
        <Card.Content>
          <View style={styles.contentWrapper}>
            <Text
              numberOfLines={2}
              style={styles.cardTitle}
              variant="titleMedium">
              {title}
            </Text>
            <Text style={styles.cardDate} variant="labelMedium">
              {date}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  },
);
