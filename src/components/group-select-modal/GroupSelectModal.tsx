import React, {FC, memo, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Modal, Portal, Text, Button, Card} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {IGroup} from '../../stores/groupStore';
import {styles} from './styles';

interface IProps {
  visible: boolean;
  onSelect: (group: IGroup) => void;
  onDismiss: () => void;
  groups: IGroup[];
}

const keyExtractor = (item: IGroup) => item.id.toString();

export const GroupSelectModal: React.FC<IProps> = memo(
  ({visible, onDismiss, groups, onSelect}) => {
    const {t} = useTranslation();

    const renderItem = useCallback(
      ({item}: {item: IGroup}) => (
        <GroupCard {...{onSelect, onDismiss, item}} />
      ),
      [],
    );

    return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={styles.modalContent}>
          <FlatList
            data={groups}
            style={styles.list}
            {...{renderItem, keyExtractor}}
          />
          <Button
            mode="contained"
            onPress={onDismiss}
            style={styles.closeButton}>
            {t('add_expense.close')}
          </Button>
        </Modal>
      </Portal>
    );
  },
);

interface IGroupCardProps {
  item: IGroup;
  onSelect: (item: IGroup) => void;
  onDismiss: () => void;
}

const GroupCard: FC<IGroupCardProps> = memo(({onSelect, onDismiss, item}) => {
  const onPress = useCallback(() => {
    onSelect(item);
    onDismiss();
  }, [onSelect, onDismiss, item]);
  return (
    <Card style={styles.card} {...{onPress}}>
      <Card.Content>
        <Text variant="bodyMedium">{item.name}</Text>
      </Card.Content>
    </Card>
  );
});
