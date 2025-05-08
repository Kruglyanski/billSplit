import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';

interface IExpense {
  id: number;
  description: string;
  amount: number;
  group: {id: number; name: string};
  paidBy: {id: number; userId: number; amount: number}[]; //TODO: вынести
  splits: {id: number; userId: number; amount: number}[];
  createdAt: string;
}

class ExpenseStore {
  expenses: Map<number, IExpense> = new Map();
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchExpenses(groupId: number) {
    //TODO: все сразу?
    this.loading = true;
    const res = await apiService.getExpenses(groupId);

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
    paidByUsers: {userId: number; amount: number}[];
    splits: {userId: number; amount: number}[];
  }) {
    const res = await apiService.createExpense(data);
    runInAction(() => {
      this.expenses.set(res.data.id, res.data);
    });
  }

  async updateExpense(
    id: number,
    data: {
      description: string;
      amount: number;
      groupId: number | null;
      splits: {userId: number; amount: number}[];
      paidBy: {userId: number; amount: number}[];
    },
  ) {
    const {data: updatedExpense} = await apiService.updateExpense(id, data);

    runInAction(() => {
      this.expenses.set(updatedExpense.id, updatedExpense);
    });
  }
}

const expenseStore = new ExpenseStore();
export default expenseStore;
