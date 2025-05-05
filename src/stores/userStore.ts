import {makeAutoObservable, runInAction} from 'mobx';
import {getAllUsers} from '../api/apiService';

interface User {
  id: number;
  name: string;
  email: string;
}

class UserStore {
  users: User[] = [];
  currentUser: User | null = null;
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
