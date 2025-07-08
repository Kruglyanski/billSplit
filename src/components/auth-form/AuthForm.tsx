import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import {styles} from './styles';
import Animated, {SlideInRight} from 'react-native-reanimated';
import {CustomButton} from '../custom-button/CustomButton';
import {CustomInput} from '../custom-input/CustomInput';

interface AuthFormProps {
  title: string;
  name?: string;
  email: string;
  password: string;
  nameError?: string;
  emailError?: string;
  passwordError?: string;
  onChangeName?: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
  onBackPress: () => void;
  submitText: string;
  backText: string;
}

export const AuthForm: React.FC<AuthFormProps> = memo(
  ({
    title,
    name,
    email,
    password,
    nameError,
    emailError,
    passwordError,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    onSubmit,
    onBackPress,
    submitText,
    backText,
  }) => {
    const {t} = useTranslation();
    return (
      <Animated.View
        entering={SlideInRight.duration(150)}
        style={styles.animatedWrapper}>
        <View style={styles.formWrapper}>
          <Text variant="headlineSmall" style={styles.subheader}>
            {title}
          </Text>
          {!!onChangeName && name !== undefined && (
            <>
              <CustomInput
                value={name}
                label={t('auth.name')}
                error={!!nameError}
                type="outlined"
                onChangeText={onChangeName}
                width={300}
              />
              <View style={styles.errorWrapper}>
                {nameError && (
                  <Text variant="labelSmall" style={styles.errorText}>
                    {nameError}
                  </Text>
                )}
              </View>
            </>
          )}
          <CustomInput
            value={email}
            label={t('auth.email')}
            error={!!emailError}
            type="outlined"
            onChangeText={onChangeEmail}
            width={300}
          />
          <View style={styles.errorWrapper}>
            {emailError && (
              <Text variant="labelSmall" style={styles.errorText}>
                {emailError}
              </Text>
            )}
          </View>
          <CustomInput
            value={password}
            label={t('auth.password')}
            error={!!passwordError}
            type="outlined"
            onChangeText={onChangePassword}
            width={300}
          />
          <View style={styles.errorWrapper}>
            {passwordError && (
              <Text variant="labelSmall" style={styles.errorText}>
                {passwordError}
              </Text>
            )}
          </View>
          <View style={styles.buttons}>
            <CustomButton
              type="secondary"
              onPress={onSubmit}
              title={submitText}
              width={200}
            />
            <CustomButton
              type="primary"
              onPress={onBackPress}
              title={backText}
              width={200}
            />
          </View>
        </View>
      </Animated.View>
    );
  },
);
