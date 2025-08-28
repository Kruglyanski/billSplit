import React, {FC, memo, useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {TSplitPaidBy} from '../../stores/expenseStore';
import {styles} from './styles';
import {IUser} from '../../stores/userStore';
import {getUserAmount} from '../../utils/helpers/get-user-amount-helper';
import {CustomInput} from '../custom-input/CustomInput';
import {ParticipantCard} from '../participant-card/ParticipantCard';

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
    return (
      <>
        {users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            handleAmountChange={handleAmountChange}
            splits={splits}
            paidBy={paidBy}
          />
        ))}
      </>
    );
  },
);

interface IUserItemProps extends Omit<IProps, 'users'> {
  user: IUser;
}

const UserItem: FC<IUserItemProps> = memo(
  ({user, handleAmountChange, splits, paidBy}) => {
    const {t} = useTranslation();

    const handlePaidChange = useCallback(
      (value: string) => {
        handleAmountChange(user.id, value, 'paid');
      },
      [user.id, handleAmountChange],
    );

    const handleSplitChange = useCallback(
      (value: string) => {
        handleAmountChange(user.id, value, 'split');
      },
      [user.id, handleAmountChange],
    );

    const paidValue = useMemo(
      () => getUserAmount(paidBy, user.id),
      [paidBy, user.id],
    );

    const splitValue = useMemo(
      () => getUserAmount(splits, user.id),
      [splits, user.id],
    );

    return (
      <View style={styles.splitRow}>
        <ParticipantCard
          item={user}
          isSelected={false}
        />
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{t('add_expense.paid')}:</Text>
            <CustomInput
              label={'0'}
              value={paidValue}
              onChangeText={handlePaidChange}
              type="outlined"
              keyboardType="numeric"
              height={52}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>{t('add_expense.must_pay')}:</Text>
            <CustomInput
              label={'0'}
              value={splitValue}
              onChangeText={handleSplitChange}
              type="outlined"
              keyboardType="numeric"
              height={52}
            />
          </View>
        </View>
      </View>
    );
  },
);
