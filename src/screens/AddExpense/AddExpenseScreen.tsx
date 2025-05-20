import React, {FC, useCallback, useState} from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {observer} from 'mobx-react-lite';
import expenseStore from '../../stores/expenseStore';
import groupStore, {IGroup} from '../../stores/groupStore';
import {
  AddExpenseScreenNavigationProps,
  EExpenseActionType,
} from '../../navigation/types';
import {GroupSelectModal} from '../../components/group-select-modal/GroupSelectModal';
import {ScreenWrapper} from '../../components/screen-wrapper/ScreenWrapper';
import {useTranslation} from 'react-i18next';
import {colors} from '../../theme/colors';
import {appStore} from '../../stores/appStore';
import {Text, TextInput} from 'react-native-paper';

interface IProps {
  route: AddExpenseScreenNavigationProps['route'];
  navigation: AddExpenseScreenNavigationProps['navigation'];
}
const GRADIENT_COLORS = [colors.green, colors.white];

export const AddExpenseScreen: FC<IProps> = observer(({route, navigation}) => {
  const {groupId: paramGroupId, actionType} = route.params;

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [groupId, setGroupId] = useState(paramGroupId || null);
  const [modalVisible, setModalVisible] = useState(false);

  const {t} = useTranslation();

  const group = groupStore.groups.find(g => g.id === groupId);
  const participants = group?.members || [];

  const [splits, setSplits] = useState<{userId: number; amount: number}[]>(() =>
    participants.map(p => ({userId: p.id, amount: 0})),
  );
  const [paidBy, setPaidBy] = useState<{userId: number; amount: number}[]>(() =>
    participants.map(p => ({userId: p.id, amount: 0})),
  );

  const handleSplitChange = useCallback((userId: number, value: string) => {
    const numeric = parseFloat(value) || 0;
    setSplits(prev => {
      const existing = prev.find(s => s.userId === userId);
      if (existing) {
        return prev.map(s =>
          s.userId === userId ? {...s, amount: numeric} : s,
        );
      } else {
        return [...prev, {userId, amount: numeric}];
      }
    });
  }, []);

  const handlePaidByChange = useCallback((userId: number, value: string) => {
    const numeric = parseFloat(value) || 0;

    setPaidBy(prev => {
      const existing = prev.find(p => p.userId === userId);
      if (existing) {
        return prev.map(p =>
          p.userId === userId ? {...p, amount: numeric} : p,
        );
      } else {
        return [...prev, {userId, amount: numeric}];
      }
    });
  }, []);

  const handleSelectGroup = useCallback((group: IGroup) => {
    setGroupId(group.id);
  }, []);

  const openGroupsList = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeGroupsList = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!description || !amount || !groupId) {
      appStore.showInfoModal({
        message: t('add_expense.fill_all_fields'),
      });
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      appStore.showInfoModal({
        message: t('add_expense.sum_must_be_positive'),
      });
      return;
    }

    const paidSum = paidBy.reduce((sum, p) => sum + p.amount, 0);
    if (paidSum !== numericAmount) {
      appStore.showInfoModal({
        message: t('add_expense.sums_must_be equal', {paidSum, numericAmount}),
      });
      return;
    }

    try {
      await expenseStore.addExpense({
        description,
        amount: numericAmount,
        groupId,
        paidByUsers: paidBy,
        splits,
      });

      navigation.goBack();
    } catch (e: any) {
      appStore.showInfoModal({
        message:
          e.response?.data?.message || t('add_expense.expense_not_created'),
      });
    }
  }, [navigation, description, amount, groupId, splits, paidBy]);

  return (
    <ScreenWrapper
      title={t(
        actionType === EExpenseActionType.CREATE
          ? 'add_expense.create_expense'
          : 'add_expense.edit_expense',
      )}
      gradientColors={GRADIENT_COLORS}
      onRightButtonPress={handleSubmit}
      onLeftButtonPress={navigation.goBack}
      leftButtonText={t('add_expense.back')}
      leftButtonIcon={'arrow-left'}
      rightButtonText={t('add_expense.add')}>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Pressable onPress={openGroupsList} style={styles.input}>
          <TextInput
            label={t('add_expense.group')}
            value={group?.name || ''}
            editable={false}
            pointerEvents="none"
          />
        </Pressable>
        <TextInput
          label={t('add_expense.description')}
          keyboardType="numeric"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TextInput
          label={t('add_expense.sum')}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />
        {participants.map(user => (
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
                  style={styles.input}
                  onChangeText={value => handlePaidByChange(user.id, value)}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  {t('add_expense.must_pay')}:
                </Text>
                <TextInput
                  placeholder="0"
                  keyboardType="numeric"
                  style={styles.input}
                  onChangeText={value => handleSplitChange(user.id, value)}
                />
              </View>
            </View>
          </View>
        ))}
        <GroupSelectModal
          visible={modalVisible}
          onDismiss={closeGroupsList}
          groups={groupStore.groups}
          onSelect={handleSelectGroup}
        />
      </ScrollView>
    </ScreenWrapper>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  scrollview: {
    marginTop: 12,
  },
  input: {
    marginBottom: 12,
  },
  label: {
    color: colors.violet,
    marginBottom: 8,
    marginTop: 16,
  },
  splitRow: {
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: colors.violet,
  },
  userName: {
    marginBottom: 4,
    color: colors.darkGray,
  },
  inputsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    color: colors.violet,
    marginBottom: 4,
  },
  groupSelector: {
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
  },
});
