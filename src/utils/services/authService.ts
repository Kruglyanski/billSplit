import * as Keychain from 'react-native-keychain';

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  await Keychain.setGenericPassword('user', accessToken, {
    service: 'access-token',
  });
  await Keychain.setGenericPassword('user', refreshToken, {
    service: 'refresh-token',
  });
};

export const getAccessToken = async () => {
  const access = await Keychain.getGenericPassword({service: 'access-token'});

  return access ? access.password : null;
};

export const getRefreshToken = async () => {
  const refresh = await Keychain.getGenericPassword({service: 'refresh-token'});

  return refresh ? refresh.password : null;
};

export const resetTokens = async () => {
  await Keychain.resetGenericPassword({service: 'access-token'});
  await Keychain.resetGenericPassword({service: 'refresh-token'});
};
