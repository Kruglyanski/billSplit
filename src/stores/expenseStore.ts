import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';

type Expense = {
  id: number;
  description: string;
  amount: number;
  groupId: number;
  paidByUserId: number;
  splits: {userId: number; amount: number}[];
};

class ExpenseStore {
  expenses: Expense[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchExpenses(groupId: number) {
    this.loading = true;
    const res = await apiService.getExpenses(groupId);
    runInAction(() => {
      this.expenses = res.data;
      this.loading = false;
    });
  }

  async addExpense(data: {
    description: string;
    amount: number;
    groupId: number;
    paidByUserId: number;
    splits: {userId: number; amount: number}[];
  }) {
    const res = await apiService.createExpense(data);
    runInAction(() => {
      this.expenses.push(res.data);
    });
  }
}

const expenseStore = new ExpenseStore();
export default expenseStore;
