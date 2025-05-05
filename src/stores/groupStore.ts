import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';

type Group = {
  id: number;
  name: string;
};

class GroupStore {
  groups: Group[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchGroups() {
    this.loading = true;
    const res = await apiService.getGroups();
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
