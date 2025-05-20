import React, {FC} from 'react';
import {View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../stores/appStore';
import {styles} from './styles';
import {colors} from '../../theme/colors';

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
        <View style={styles.buttons}>
          {infoModalAction && (
            <Button
              mode="outlined"
              onPress={infoModalAction}
              style={styles.confirmButton}>
              {t('info_modal.confirm')}
            </Button>
          )}
          <Button
            mode="contained"
            onPress={hideInfoModal}
            style={styles.closeButton}>
            {t('info_modal.close')}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
});
