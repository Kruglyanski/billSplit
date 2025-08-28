import { TSplitPaidByExtended } from '../../screens/AddExpense/AddExpenseScreen';

import {IUser} from '../../stores/userStore';

export const getUserAmountData = (data: TSplitPaidByExtended[], userId: IUser['id']) => {
  const userData = data?.find(s => s.userId === userId);

  return {value: userData?.amount.toString() || '0', edited: userData?.edited || false};
};
