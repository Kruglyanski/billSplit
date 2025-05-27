import React, {FC, memo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {TSplitPaidBy} from '../../stores/expenseStore';
import {styles} from './styles';
import {IUser} from '../../stores/userStore';
import {getUserAmount} from '../../utils/helpers/get-user-amount-helper';

interface IProps {
  splits: TSplitPaidBy[];
  paidBy: TSplitPaidBy[];
  users: IUser[];
}

export const ExpenseDetailsUserList: FC<IProps> = memo(
  ({users, paidBy, splits}) => {
    const {t} = useTranslation();
    return (
      <>
        {users.map(user => (
          <View key={user.id} style={styles.splitRow}>
            <Text variant="bodyLarge" style={styles.userName}>
              {user.name}
            </Text>
            <View style={styles.textContainer}>
              <Text style={styles.label}>{t('add_expense.paid')}: </Text>
              <Text style={styles.label}>{getUserAmount(paidBy, user.id)}</Text>
              <Text style={styles.label}>{t('add_expense.must_pay')}:</Text>
              <Text style={styles.label}>{getUserAmount(splits, user.id)}</Text>
            </View>
          </View>
        ))}
      </>
    );
  },
);
