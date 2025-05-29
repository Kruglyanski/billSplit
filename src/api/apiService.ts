import {TSplitPaidBy} from '../stores/expenseStore';
import {IGroup} from '../stores/groupStore';
import {IUser, TExtraUser} from '../stores/userStore';
import api from './api';

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post('/auth/register', data);

export const login = (data: {email: string; password: string}) =>
  api.post('/auth/login', data);

export const loginWithGoogle = (data: {idToken: string}) =>
  api.post('/auth/google', data);

export const getMe = () => api.get('/users/me');

export const getUserGroups = () => api.get('/groups');

export const createGroup = (
  name: string,
  userIds: number[],
  extraUsers: TExtraUser[],
) => api.post<IGroup>('/groups', {name, userIds, extraUsers});

export const getGroup = (groupId: number) => api.get(`/groups/${groupId}`);

export const addUserToGroup = (groupId: number, userId: number) =>
  api.post(`/groups/${groupId}/add-user`, {userId});

export const getExpensesByGroup = (groupId: number) =>
  api.get(`/expenses`, {params: {groupId}});

export const getExpensesByUser = () => api.get(`/expenses/user`);

export const createExpense = (data: {
  description: string;
  amount: number;
  groupId: number;
  paidByUsers: TSplitPaidBy[];
  splits: TSplitPaidBy[];
}) => api.post('/expenses', data);

export const updateExpense = (
  id: number,
  data: {
    description: string;
    amount: number;
    groupId: number | null;
    splits: TSplitPaidBy[];
    paidBy: TSplitPaidBy[];
  },
) => api.put(`/expenses/${id}`, data);

export const deleteExpense = (id: number) => api.delete(`/expenses/${id}`);

export const getAllUsers = () => api.get('/users');

export const getRelatedUsers = () => api.get('/users/related');

export const getUserByEmail = (email: string) =>
  api.get<IUser>(`/users/by-email?email=${email}`);

export const getExpenseHistory = () => api.get(`/expenses/history`);

export const getBalance = (groupId: number) =>
  api.get(`/groups/${groupId}/debts`);
