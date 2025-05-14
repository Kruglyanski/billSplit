import {observer} from 'mobx-react-lite';
import React, {FC} from 'react';
import {Button, Modal, Portal, Text, useTheme} from 'react-native-paper';
import {appStore} from '../../stores/appStore';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {styles} from './styles';

export const InfoModal: FC = observer(() => {
  const {infoModalMessage, infoModalTitle, hideInfoModal} = appStore;
  const {t} = useTranslation();
  const {colors} = useTheme();
  return (
    <Portal>
      <Modal
        visible={!!infoModalMessage}
        onDismiss={hideInfoModal}
        contentContainerStyle={[
          styles.modal,
          {backgroundColor: colors.background},
        ]}>
        <View>
          <Text variant="headlineSmall">
            {infoModalTitle || t('info_modal.error')}
          </Text>
          <Text variant="bodyLarge" style={styles.text}>
            {infoModalMessage}
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={hideInfoModal}
          style={styles.closeButton}>
          {t('info_modal.close')}
        </Button>
      </Modal>
    </Portal>
  );
});
