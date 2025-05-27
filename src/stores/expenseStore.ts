import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';

export type TSplitPaidBy = {
  id?: number;
  userId: number;
  amount: number;
};

export interface IExpense {
  id: number;
  description: string;
  amount: number;
  group: {id: number; name: string}; //
  paidBy: TSplitPaidBy[];
  splits: TSplitPaidBy[];
  createdAt: string;
}

class ExpenseStore {
  expenses: Map<number, IExpense> = new Map();
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchExpensesByUser() {
    this.loading = true;
    const res = await apiService.getExpensesByUser();

    runInAction(() => {
      res.data.forEach((expense: IExpense) =>
        this.expenses.set(expense.id, expense),
      );
      this.loading = false;
    });
  }

  async addExpense(data: {
    description: string;
    amount: number;
    groupId: number;
    paidByUsers: TSplitPaidBy[];
    splits: TSplitPaidBy[];
  }) {
    const res = await apiService.createExpense(data);
    runInAction(() => {
      const newMap = new Map<number, IExpense>();
      newMap.set(res.data.id, res.data);
      for (const [key, value] of this.expenses) {
        newMap.set(key, value);
      }
      this.expenses = newMap;
    });
  }

  async updateExpense(
    id: number,
    data: {
      description: string;
      amount: number;
      groupId: number | null;
      splits: TSplitPaidBy[];
      paidBy: TSplitPaidBy[];
    },
  ) {
    const {data: updatedExpense} = await apiService.updateExpense(id, data);

    runInAction(() => {
      this.expenses.set(updatedExpense.id, updatedExpense);
    });
  }

  async deleteExpense(id: number) {
    await apiService.deleteExpense(id);

    runInAction(() => {
      this.expenses.delete(id);
    });
  }
}

const expenseStore = new ExpenseStore();
export default expenseStore;
