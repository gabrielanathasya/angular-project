export const endpoints = {
  user: {
    base: '/users',
    by_id: (id: number) => `/users/${id}`,
  },
};
