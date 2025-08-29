import {observer} from 'mobx-react-lite';
import {FC, useEffect} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import authStore from '../../stores/authStore';
import groupStore from '../../stores/groupStore';
import {Text} from 'react-native-paper';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {colors} from '../../theme/colors';

interface IProps {
  groupId: number;
}

export const Balances: FC<IProps> = observer(({groupId}) => {
  const data = groupStore.debtResult;
  const myId = authStore.user?.id;

  const {t} = useTranslation();

  useEffect(() => {
    groupStore.fetchBalance(groupId);
  }, [groupId]);

  if (!data) return <ActivityIndicator color={colors.white} size={'large'} />;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <Text variant="titleMedium" style={styles.textTitle}>
        {t('balances.my_position')}:
      </Text>
      <Text style={styles.textWhite}>
        {t('balances.you_owe_the_amount')}:{'   '}
        {data.myPosition.totalOwed}
      </Text>
      <Text style={styles.textWhite}>
        {t('balances.you_are_owed_the_amount')}:{'   '}
        {data.myPosition.totalToReceive}
      </Text>
      <Text style={styles.textWhite}>
        {t('balances.total_balance')}:{'   '}
        {data.myPosition.netBalance}
      </Text>
      <Text variant="titleMedium" style={styles.textTitle}>
        {t('balances.balances_of_others')}:
      </Text>

      {data.balances.map(b => {
        if (b.userId === myId) {
          return null;
        }

        return (
          <Text key={b.userId} style={styles.textWhite}>
            {b.userName}:{'   '}
            {b.balance}
          </Text>
        );
      })}
      <Text variant="titleMedium" style={styles.textTitle}>
        {t('balances.who_owes_whoom')}:
      </Text>
      {data.transactions.map(t => {
        return (
          <Text key={t.fromUserId + t.toUserId} style={styles.textWhite}>
            {t.fromUserName}
            {'   '} → {'   '}
            {t.toUserName}:{'   '}
            {t.amount}
          </Text>
        );
      })}
    </ScrollView>
  );
});
