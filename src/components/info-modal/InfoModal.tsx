import React, {FC} from 'react';
import {Modal, View, TouchableWithoutFeedback} from 'react-native';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../stores/appStore';
import {CustomButton} from '../custom-button/CustomButton';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {Text} from 'react-native-paper';

export const InfoModal: FC = observer(() => {
  const {infoModalMessage, infoModalTitle, hideInfoModal, infoModalAction} =
    appStore;
  const {t} = useTranslation();

  return (
    <Modal
      visible={!!infoModalMessage}
      transparent
      animationType="fade"
      onRequestClose={hideInfoModal}>
      <TouchableWithoutFeedback onPress={hideInfoModal}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text variant="headlineSmall" style={styles.title}>
                {infoModalTitle || t('info_modal.error')}
              </Text>
              <Text style={styles.message}>{infoModalMessage}</Text>
              <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                  <CustomButton
                    title={t('info_modal.close')}
                    onPress={hideInfoModal}
                    type={'secondary'}
                  />
                </View>
                {infoModalAction && (
                  <View style={styles.button}>
                    <CustomButton
                      title={t('info_modal.confirm')}
                      onPress={infoModalAction}
                      type={'primary'}
                    />
                  </View>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});
