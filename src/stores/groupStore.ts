import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';
import {IUser, TExtraUser} from './userStore';

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
  groups: Map<number, IGroup> = new Map();
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
      res.data.forEach(group => this.groups.set(group.id, group));
      this.loading = false;
    });
  }

  async createGroup(name: string, userIds: number[]) {
    try {
      const res = await apiService.createGroup(name, userIds);

      runInAction(() => {
        this.groups.set(res.data.id, res.data);
      });
      return res.data.id;
    } catch (error) {
      console.error('Ошибка при создании группы', error);
    }
  }

  async updateGroup(id: number, name: string, userIds: number[]) {
    try {
      const res = await apiService.updateGroup(id, name, userIds);
      runInAction(() => {
        this.groups = this.groups.set(res.data.id, res.data);
      });
      return res.data;
    } catch (error) {
      console.error('Ошибка обновления группы', error);
      throw error;
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
