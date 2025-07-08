import * as Keychain from 'react-native-keychain';
import {jwtDecode} from 'jwt-decode';

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

export function isJwtExpired(token: string): boolean {
  if (!token) return true;

  try {
    const {exp} = jwtDecode<{exp: number}>(token);
    if (!exp) return true;

    const currentTime = Date.now() / 1000; // в секундах
    return exp < currentTime;
  } catch (e) {
    return true;
  }
}
