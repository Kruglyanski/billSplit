import React, {FC, memo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {IUser} from '../../stores/userStore';
import { getUserAmountData} from '../../utils/helpers/get-user-amount-helper';
import { TSplitPaidByExtended } from '../../screens/AddExpense/AddExpenseScreen';

interface IProps {
  splits: TSplitPaidByExtended[];
  paidBy: TSplitPaidByExtended[];
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
              <Text style={styles.label}>{getUserAmountData(paidBy, user.id).value}</Text>
              <Text style={styles.label}>{t('add_expense.must_pay')}:</Text>
              <Text style={styles.label}>{getUserAmountData(splits, user.id).value}</Text>
            </View>
          </View>
        ))}
      </>
    );
  },
);
