import React, {FC, memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {colors} from '../../theme/colors';
import {getAvatarColorByEmail} from '../../utils/helpers/get-avatar-color-by-email';
import {styles} from './styles';
import {IUser} from '../../stores/userStore';

interface IProps {
  item: IUser;
  isSelected: boolean;
  handlePress: (itemId: number) => void;
  handleDeletePress: (itemId: number) => void;
}

export const ParticipantCard: FC<IProps> = memo(
  ({item, isSelected, handlePress, handleDeletePress}) => {
    const getInitials = () => item.name.slice(0, 2)?.toUpperCase() || '?';

    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.itemSelected]}
        onPress={() => handlePress(item.id)}>
        <View
          style={[
            styles.avatar,
            {backgroundColor: getAvatarColorByEmail(item.email)},
          ]}>
          <Text style={styles.avatarText}>{getInitials()}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          {item.email && (
            <Text variant="labelMedium" style={styles.email}>
              {item.email}
            </Text>
          )}
        </View>
        {isSelected && (
          <IconButton
            icon={'close'}
            iconColor={colors.white}
            size={16}
            onPress={() => handleDeletePress(item.id)}
          />
        )}
      </TouchableOpacity>
    );
  },
);
