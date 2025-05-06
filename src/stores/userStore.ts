import {makeAutoObservable, runInAction} from 'mobx';
import {getAllUsers} from '../api/apiService';

export interface IUser {
  id: number;
  name: string;
  email: string;
}

class UserStore {
  users: IUser[] = [];
  // currentUser: IUser | null = null;
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    try {
      const res = await getAllUsers();
      runInAction(() => {
        this.users = res.data;
      });
    } catch (error) {
      console.error('Ошибка при загрузке пользователей', error);
    }
  }

  //   async fetchCurrentUser() {
  //     try {
  //       const res = await getCurrentUser();
  //       runInAction(() => {
  //         this.currentUser = res.data;
  //       });
  //     } catch (e) {
  //       console.warn('Ошибка получения текущего пользователя', e)
  //     }
  //   }
}

const userStore = new UserStore();
export default userStore;
