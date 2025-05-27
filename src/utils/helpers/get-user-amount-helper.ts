import {TSplitPaidBy} from '../../stores/expenseStore';
import {IUser} from '../../stores/userStore';

export const getUserAmount = (data: TSplitPaidBy[], userId: IUser['id']) => {
  return data?.find(s => s.userId === userId)?.amount?.toString() || '0';
};
