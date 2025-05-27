import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';
import {IUser} from './userStore';

interface ITransaction {
  fromUserId: number;
  fromUserName: string;
  toUserId: number;
  toUserName: string;
  amount: number;
}

interface IBalance {
  userId: number;
  userName: string;
  balance: number;
}

interface IMyPosition {
  totalOwed: number;
  totalToReceive: number;
  netBalance: number;
}

interface IDebtResult {
  transactions: ITransaction[];
  balances: IBalance[];
  myPosition: IMyPosition;
}

export interface IGroup {
  id: number;
  name: string;
  createdAt: string;
  members: IUser[];
  debtResult: IDebtResult;
}

class GroupStore {
  groups: IGroup[] = [];
  loading = false;
  debtResult: IDebtResult | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // async fetchGroups() {
  //   this.loading = true;
  //   const res = await apiService.getGroups();
  //   runInAction(() => {
  //     this.groups = res.data;
  //     this.loading = false;
  //   });
  // }

  async fetchUserGroups() {
    this.loading = true;
    const res = await apiService.getUserGroups();
    runInAction(() => {
      this.groups = res.data;
      this.loading = false;
    });
  }

  async createGroup(name: string, userIds: string[]) {
    try {
      const res = await apiService.createGroup(name, userIds);
      runInAction(() => {
        this.groups.push(res.data);
      });
    } catch (error) {
      console.error('Ошибка при создании группы', error);
    }
  }

  async fetchBalance(groupId: number) {
    try {
      const res = await apiService.getBalance(groupId);
      runInAction(() => {
        this.debtResult = res.data;
      });
    } catch (error) {
      console.error('Ошибка при запросе баланса', error);
    }
  }
}

const groupStore = new GroupStore();
export default groupStore;
