export const endpoints = {
  user: {
    base: '/users',
    by_id: (id: number) => `/users/${id}`,
    get_posts: (id: number) => `/posts?userId=${id}`,
  },
};
