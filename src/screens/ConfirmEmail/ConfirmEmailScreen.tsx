import React, {useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import authStore from '../../stores/authStore';

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const ConfirmEmailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const token = (route.params as any)?.token;
  const [email, setEmail] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  React.useEffect(() => {
    if (token) {
      const payload = parseJwt(token);
      if (payload?.email) {
        setEmail(payload.email);
      }
    }
  }, [token]);

  const confirmEmail = async () => {
    try {
      await authStore.confirmEmail(token);
      setConfirmed(true);
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось подтвердить email');
    }
  };

  const onOk = () => {
    setConfirmed(false);
    navigation.navigate('Tabs', {screen: 'Home'});
  };

  {
    confirmed &&
      Alert.alert(
        'Успех',
        'Email успешно подтвержден!',
        [{text: 'OK', onPress: onOk}],
        {cancelable: false},
      );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}>
      <Text style={{fontSize: 18, marginBottom: 16, textAlign: 'center'}}>
        {email ? `Email ${email} ждет подтверждения.` : 'Подтверждение Email'}
      </Text>

      <Button
        title="Перейти к авторизации"
        onPress={() => navigation.navigate('Auth')}
      />
      <View style={{height: 16}} />
      <Button title="Подтвердить Email" onPress={confirmEmail} />
    </View>
  );
};
