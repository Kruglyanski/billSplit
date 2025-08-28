import React, {FC, memo, useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {IUser} from '../../stores/userStore';
import {getUserAmountData} from '../../utils/helpers/get-user-amount-helper';
import {CustomInput} from '../custom-input/CustomInput';
import {ParticipantCard} from '../participant-card/ParticipantCard';
import {TSplitPaidByExtended} from '../../screens/AddExpense/AddExpenseScreen';
import {colors} from '../../theme/colors';

interface IProps {
  handleAmountChange: (
    userId: number,
    value: string,
    type: 'paid' | 'split',
  ) => void;
  splits: TSplitPaidByExtended[];
  paidBy: TSplitPaidByExtended[];
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

    const userPaidData = useMemo(
      () => getUserAmountData(paidBy, user.id),
      [paidBy, user.id],
    );

    const userSplitData = useMemo(
      () => getUserAmountData(splits, user.id),
      [splits, user.id],
    );

    return (
      <View style={styles.splitRow}>
        <ParticipantCard item={user} isSelected={false} />
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <Text
              style={[
                styles.inputLabel,
                !userPaidData.edited && styles.highlight,
              ]}>
              {!userPaidData.edited && <Text style={styles.highlight}>! </Text>}
              {t('add_expense.paid')}:
            </Text>
            <CustomInput
              label={'0'}
              value={userPaidData.value}
              onChangeText={handlePaidChange}
              type="outlined"
              keyboardType="numeric"
              height={52}
              borderColor={!userPaidData.edited ? colors.yellow : undefined}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text
              style={[
                styles.inputLabel,
                !userSplitData.edited && styles.highlight,
              ]}>
              {!userSplitData.edited && (
                <Text style={styles.highlight}>! </Text>
              )}
              {t('add_expense.must_pay')}:
            </Text>
            <CustomInput
              label={'0'}
              value={userSplitData.value}
              onChangeText={handleSplitChange}
              type="outlined"
              keyboardType="numeric"
              height={52}
              borderColor={!userSplitData.edited ? colors.yellow : undefined}
            />
          </View>
        </View>
      </View>
    );
  },
);
