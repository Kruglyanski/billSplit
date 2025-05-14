import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {styles} from './styles';
import Animated, {SlideInRight} from 'react-native-reanimated';

interface AuthFormProps {
  title: string;
  name?: string;
  email: string;
  password: string;
  nameError?: string;
  emailError?: string;
  passwordError?: string;
  showNameField?: boolean;
  onChangeName?: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
  onSwitchMode: () => void;
  submitText: string;
  switchText: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  name,
  email,
  password,
  nameError,
  emailError,
  passwordError,
  showNameField,
  onChangeName,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onSwitchMode,
  submitText,
  switchText,
}) => {
  const {t} = useTranslation();
  return (
    <Animated.View
      entering={SlideInRight.duration(150)}
      style={styles.animatedWrapper}>
      <View style={styles.formWrapper}>
        <Text variant="headlineLarge" style={styles.subheader}>
          {title}
        </Text>
        {showNameField && (
          <>
            <TextInput
              label={t('auth.name')}
              value={name}
              onChangeText={onChangeName}
              mode="outlined"
              error={!!nameError}
              style={styles.input}
            />
            {nameError && <Text style={styles.errorText}>{nameError}</Text>}
          </>
        )}
        <TextInput
          label={t('auth.email')}
          value={email}
          onChangeText={onChangeEmail}
          mode="outlined"
          error={!!emailError}
          style={styles.input}
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <TextInput
          label={t('auth.password')}
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          mode="outlined"
          error={!!passwordError}
          style={styles.input}
        />
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        <Button mode="contained" onPress={onSubmit} style={styles.button}>
          {submitText}
        </Button>
        <Button mode="outlined" onPress={onSwitchMode} style={styles.button}>
          {switchText}
        </Button>
      </View>
    </Animated.View>
  );
};
