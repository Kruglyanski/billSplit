import {makeAutoObservable, runInAction} from 'mobx';
import {
  createFakeUser,
  getRelatedUsers,
  getUserByEmail,
} from '../api/apiService';

export interface IUser {
  id: number;
  name: string;
  email: string;
  registered: boolean;
}

export type TExtraUser = Omit<IUser, 'id'>;

class UserStore {
  users: Map<number, IUser> = new Map();
  // currentUser: IUser | null = null;
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // async fetchUsers() {
  //   try {
  //     const res = await getAllUsers();

  //     runInAction(() => {
  //       this.users.clear();
  //       res.data.forEach((user: IUser) => this.users.set(user.id, user));
  //     });
  //   } catch (error) {
  //     console.error('Ошибка при загрузке пользователей', error);
  //   }
  // }

  async fetchRelatedUsers() {
    try {
      const res = await getRelatedUsers();
      console.log('asd fetchUsers res', res);
      runInAction(() => {
        this.users.clear();
        res.data.forEach((user: IUser) => {
          this.users.set(user.id, user);
        });
      });
    } catch (error) {
      console.error('Ошибка при загрузке связанных пользователей', error);
    }
  }

  async fetchUserByEmail(email: string) {
    try {
      const res = await getUserByEmail(email);

      runInAction(() => {
        const newMap = new Map<number, IUser>();
        newMap.set(res.data.id, res.data);
        for (const [key, value] of this.users) {
          newMap.set(key, value);
        }
        this.users = newMap;
      });
      return res.data;
    } catch (error: any) {
      console.error('Ошибка при загрузке пользователя по Email', error);
      throw error;
    }
  }

  async createUserWithFakeEmail(name: string): Promise<IUser> {
    try {
      const res = await createFakeUser(name);

      runInAction(() => {
        this.users.set(res.data.id, res.data);
      });

      return res.data;
    } catch (error) {
      console.error('Ошибка при создании фейкового пользователя', error);
      throw error;
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
