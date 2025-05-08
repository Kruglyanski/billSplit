import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';
import {IUser} from './userStore';

export interface IExpenseHistoryItem {
  id: number;
  previousData: {
    description: string;
    amount: number;
    groupId: number;
  } | null;
  newData: {
    description: string;
    amount: number;
    groupId: number;
  } | null;
  action: string;
  user: IUser;
  createdAt: string;
}

class HistoryStore {
  expensesHistory: Map<number, IExpenseHistoryItem> = new Map();
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  //TODO: проверить на других юзерах
  async fetchExpenseHistory() {
    this.loading = true;
    const res = await apiService.getExpenseHistory();

    runInAction(() => {
      res.data.forEach((historyItem: IExpenseHistoryItem) => {
        console.log(historyItem);
        this.expensesHistory.set(historyItem.id, historyItem);
      });

      this.loading = false;
    });
  }
}

const historyStore = new HistoryStore();
export default historyStore;
