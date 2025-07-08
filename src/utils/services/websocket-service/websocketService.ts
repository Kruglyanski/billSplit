import {io, Socket} from 'socket.io-client';
import authStore from '../../../stores/authStore';
import groupStore from '../../../stores/groupStore';
import {WS_EVENTS} from './events';
import {API_BASE_URL} from '../../../api/api';
import {isJwtExpired} from '../authService';

let socket: Socket | null = null;

export const initSocket = async () => {
  if (socket) return;
  let token = authStore.jwt;

  if (isJwtExpired(authStore.jwt || '')) {
    try {
      token = await authStore.refreshToken();
    } catch (error) {
      console.log('refresh token error', error);
    }
  }

  socket = io(API_BASE_URL, {
    transports: ['websocket'],
    auth: {token},
  });

  socket.on('connect', () => {
    console.log('WebSocket connected');
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
  });

  socket.on('reconnect', attempt => {
    console.log('Reconnected after', attempt, 'tries');
  });

  socket.on('reconnect_attempt', () => {
    console.log('Trying to reconnect...');
  });

  socket.on('reconnect_failed', () => {
    console.log('Failed to reconnect');
  });

  socket.on(WS_EVENTS.INIT_GROUPS, pay => {
    console.log('WebSocket init groups', pay);
    // groupStore.setGroups()
  });
  socket.on(WS_EVENTS.GROUP_CREATED, ({group}) => {
    console.log('WebSocket GROUP_CREATED', group);
    // groupStore.addGroup(group);
  });
  socket.on(WS_EVENTS.ADDED_TO_GROUP, ({groupId}) => {
    // Например, можно подгрузить новые группы
    console.log('WebSocket iADDED_TO_GROU', groupId);
    // groupStore.fetchGroups(); // сделать REST-запрос на обновление
  });
  socket.on(WS_EVENTS.EXPENSE_CREATED, pay => {
    console.log('WebSocket EXPENSE_CREATED', pay);
    // expenseStore.onExpenseCreated()
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
