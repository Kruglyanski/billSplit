import React, {FC, memo} from 'react';
import {View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {TSplitPaidBy} from '../../stores/expenseStore';
import {styles} from './styles';
import {IUser} from '../../stores/userStore';
import {getUserAmount} from './helper';

interface IProps {
  handleAmountChange: (
    userId: number,
    value: string,
    type: 'paid' | 'split',
  ) => void;
  splits: TSplitPaidBy[];
  paidBy: TSplitPaidBy[];
  users: IUser[];
}

export const EditExpenseFormUsersList: FC<IProps> = memo(
  ({users, handleAmountChange, paidBy, splits}) => {
    const {t} = useTranslation();
    return (
      <>
        {users.map(user => (
          <View key={user.id} style={styles.splitRow}>
            <Text variant="bodyLarge" style={styles.userName}>
              {user.name}
            </Text>
            <View style={styles.inputsContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>{t('add_expense.paid')}:</Text>
                <TextInput
                  placeholder="0"
                  keyboardType="numeric"
                  value={getUserAmount(paidBy, user.id)}
                  style={styles.input}
                  onChangeText={value =>
                    handleAmountChange(user.id, value, 'paid')
                  }
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  {t('add_expense.must_pay')}:
                </Text>
                <TextInput
                  placeholder="0"
                  keyboardType="numeric"
                  value={getUserAmount(splits, user.id)}
                  style={styles.input}
                  onChangeText={value =>
                    handleAmountChange(user.id, value, 'split')
                  }
                />
              </View>
            </View>
          </View>
        ))}
      </>
    );
  },
);
