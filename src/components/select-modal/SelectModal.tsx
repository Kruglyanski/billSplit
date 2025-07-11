import React, {useCallback, useState} from 'react';
import {Modal, View, FlatList, StyleSheet} from 'react-native';
import {CustomButton} from '../custom-button/CustomButton';
import {SelectItemCard} from './SelectItemCard';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native-paper';
import {styles} from './styles';

export interface IOption<T> {
  id: number | string;
  label: string;
  value: T;
}

interface IProps<T> {
  visible: boolean;
  onDismiss: () => void;
  options: IOption<T>[];
  onSelect: (selected: T[] | T) => void;
  multiple?: boolean;
  title?: string;
  cancelLabel?: string;
  confirmLabel?: string;
}

const keyExtractor = <R,>(item: IOption<R>) => item.id.toString();

export const SelectModal = <T,>({
  visible,
  onDismiss,
  options,
  onSelect,
  multiple = false,
  title,
  cancelLabel,
  confirmLabel,
}: IProps<T>) => {
  const [selectedValues, setSelectedValues] = useState<T[]>([]);

  const {t} = useTranslation();

  const getIsSelected = useCallback(
    (value: T) => selectedValues.some(v => v === value),
    [selectedValues],
  );

  const close = useCallback(() => {
    onDismiss();
    setSelectedValues([]);
  }, [onDismiss]);

  const handleSelect = useCallback(
    (value: T) => {
      if (multiple) {
        setSelectedValues(prev => {
          if (prev.some(v => v === value)) {
            return prev.filter(v => v !== value);
          } else {
            return [...prev, value];
          }
        });
      } else {
        setSelectedValues([value]);
        onSelect(value);
        close();
      }
    },
    [multiple, close, onSelect],
  );

  const handleConfirm = useCallback(() => {
    onSelect(selectedValues);
    close();
  }, [close, onSelect, selectedValues]);

  const renderItem = useCallback(
    ({item}: {item: IOption<T>}) => {
      return (
        <SelectItemCard
          selected={getIsSelected(item.value)}
          {...{item, handleSelect, multiple}}
        />
      );
    },
    [handleSelect, getIsSelected, multiple],
  );

  return (
    <Modal
      animationType="fade"
      transparent
      onRequestClose={close}
      {...{visible}}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {title && (
            <Text variant="headlineSmall" style={styles.title}>
              {title}
            </Text>
          )}
          <FlatList
            data={options}
            style={styles.list}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            {...{renderItem, keyExtractor}}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <CustomButton
                title={cancelLabel || t('select_modal.cancel')}
                onPress={close}
                type={'secondary'}
              />
            </View>
            {multiple && (
              <View style={styles.button}>
                <CustomButton
                  title={confirmLabel || t('select_modal.confirm')}
                  onPress={handleConfirm}
                  type={'primary'}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
