import api from './api';

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post('/auth/register', data);

export const login = (data: {email: string; password: string}) =>
  api.post('/auth/login', data);

export const getMe = () => api.get('/users/me');

export const getUserGroups = () => api.get('/groups');

export const createGroup = (name: string, userIds: any) =>
  api.post('/groups', {name, userIds}); //TODO: types

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
  paidByUsers: {userId: number; amount: number}[];
  splits: {userId: number; amount: number}[];
}) => api.post('/expenses', data);

export const updateExpense = (
  id: number,
  data: {
    description: string;
    amount: number;
    groupId: number | null;
    splits: {userId: number; amount: number}[];
    paidBy: {userId: number; amount: number}[];
  },
) => api.put(`/expenses/${id}`, data);

export const deleteExpense = (id: number) => api.delete(`/expenses/${id}`);

export const getAllUsers = () => api.get('/users');

export const getExpenseHistory = () => api.get(`/expenses/history`);

export const getBalance = (groupId: number) =>
  api.get(`/groups/${groupId}/debts`);
