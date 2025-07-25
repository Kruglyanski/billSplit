export const getInitials = (name: string) =>
  name.slice(0, 2)?.toUpperCase() || '?';
