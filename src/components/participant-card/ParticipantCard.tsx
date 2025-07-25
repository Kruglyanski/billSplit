import React, {FC, memo, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {colors} from '../../theme/colors';
import {styles} from './styles';
import {IUser} from '../../stores/userStore';
import {getColorById} from '../../utils/helpers/get-color-by-id';
import {getInitials} from '../../utils/helpers/get-initials';

interface IProps {
  item: IUser;
  isSelected: boolean;
  handlePress: (itemId: number) => void;
  handleDeletePress: (itemId: number) => void;
}

export const ParticipantCard: FC<IProps> = memo(
  ({item, isSelected, handlePress, handleDeletePress}) => {
    const onPress = useCallback(() => {
      handlePress(item.id);
    }, [handlePress, item.id]);

    const onDeletePress = useCallback(() => {
      handleDeletePress(item.id);
    }, [handleDeletePress, item.id]);

    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.itemSelected]}
        {...{onPress}}>
        <View style={[styles.avatar, {backgroundColor: getColorById(item.id)}]}>
          <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
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
            onPress={onDeletePress}
          />
        )}
      </TouchableOpacity>
    );
  },
);
