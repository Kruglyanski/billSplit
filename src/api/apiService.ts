import api from './api';

export const register = (data: { name: string; email: string; password: string }) =>
  api.post('/auth/register', data);

export const login = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const getGroups = () => api.get('/groups');

export const createGroup = (name: string) => api.post('/groups', { name });

export const getGroup = (groupId: number) => api.get(`/groups/${groupId}`);

export const addUserToGroup = (groupId: number, userId: number) =>
  api.post(`/groups/${groupId}/add-user`, { userId });

export const getExpenses = (groupId: number) =>
  api.get(`/expenses`, { params: { groupId } });

export const createExpense = (data: {
  description: string;
  amount: number;
  groupId: number;
  paidByUserId: number;
  splits: { userId: number; amount: number }[];
}) => api.post('/expenses', data);

export const getBalance = (groupId: number) =>
  api.get('/expenses/balance', { params: { groupId } });

export const getSettlements = (groupId: number) =>
  api.get('/expenses/settlements', { params: { groupId } });
