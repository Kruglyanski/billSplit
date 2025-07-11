import React, {FC} from 'react';
import {View} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../stores/appStore';
import {styles} from './styles';
import {colors} from '../../theme/colors';
import {CustomButton} from '../custom-button/CustomButton';

export const InfoModal: FC = observer(() => {
  const {infoModalMessage, infoModalTitle, hideInfoModal, infoModalAction} =
    appStore;
  const {t} = useTranslation();

  return (
    <Portal>
      <Modal
        visible={!!infoModalMessage}
        onDismiss={hideInfoModal}
        contentContainerStyle={[styles.modal, {backgroundColor: colors.white}]}>
        <View>
          <Text variant="headlineSmall">
            {infoModalTitle || t('info_modal.error')}
          </Text>
          <Text variant="bodyLarge" style={styles.text}>
            {infoModalMessage}
          </Text>
        </View>
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
      </Modal>
    </Portal>
  );
});
