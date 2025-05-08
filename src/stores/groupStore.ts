import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';
import {IUser} from './userStore';

export interface IGroup {
  id: number;
  name: string;
  members: IUser[];
}

class GroupStore {
  groups: IGroup[] = [];
  loading = false;

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
}

const groupStore = new GroupStore();
export default groupStore;
