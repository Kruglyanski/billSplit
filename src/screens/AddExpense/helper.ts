import {TSplitPaidByExtended} from './AddExpenseScreen';

export const updateAmounts = (
  list: TSplitPaidByExtended[],
  totalAmount: number,
  editedUserId?: number,
  newValue?: number,
) => {
  let updated = [...list];

  if (editedUserId !== undefined && newValue !== undefined) {
    updated = updated.map(u =>
      u.userId === editedUserId
        ? {
            ...u,
            amount: newValue > totalAmount ? totalAmount : newValue,
            edited: true,
          }
        : u,
    );
  } else {
    updated = updated.map(u => ({
      ...u,
      amount: totalAmount / updated.length,
      edited: false,
    }));
  }

  const totalEdited = updated
    .filter(u => u.edited)
    .reduce((sum, u) => sum + u.amount, 0);
  const remaining = totalAmount - totalEdited;
  const notEdited = updated.filter(u => !u.edited);

  const perPerson = notEdited.length > 0 ? remaining / notEdited.length : 0;
  updated = updated.map(u => (u.edited ? u : {...u, amount: perPerson}));

  return updated;
};
