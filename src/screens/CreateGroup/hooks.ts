import {useMemo, useState} from 'react';
import {IUser} from '../../stores/userStore';

export const useInvitees = () => {
  const [invitees, setInvitees] = useState(new Map<number, IUser>());

  const addInvitee = (user: IUser) => {
    setInvitees(prev => new Map(prev.set(user.id, user)));
  };

  const removeInvitee = (id: number) => {
    setInvitees(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  const clearInvitees = () => {
    setInvitees(new Map());
  };

  const inviteeArray = useMemo(() => [...invitees.values()], [invitees]);

  return {invitees, inviteeArray, addInvitee, removeInvitee, clearInvitees};
};
