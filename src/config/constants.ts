export const apiUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : 'https://powerful-river-29654.herokuapp.com/api';

export const LOCAL_STORAGE_KEY = {
  ACCESS_TOKEN: 'accessToken',
};
