import {FC, memo} from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import dayjs from 'dayjs';
import {styles} from './styles';

interface IProps {
  title: string;
  createdAt: string;
  color: string;
  onPress: () => void;
}

export const ItemCard: FC<IProps> = memo(
  ({title, createdAt, color, onPress}) => {
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
              {dayjs(createdAt).format('DD.MM.YYYY HH:mm')}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  },
);
