import {TSplitPaidByExtended} from '../../screens/AddExpense/AddExpenseScreen';
import {TSplitPaidBy} from '../../stores/expenseStore';

import {IUser} from '../../stores/userStore';

export const getUserAmountData = (
  data: TSplitPaidByExtended[] | TSplitPaidBy[],
  userId: IUser['id'],
) => {
  const userData = data?.find(s => s.userId === userId);

  return {
    value: userData?.amount.toString() || '0',
    edited: (userData as TSplitPaidByExtended)?.edited ?? true,
  };
};
