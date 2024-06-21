// src/redux/middleware/initializeDataMiddleware.js
import { fetchGlobalsData } from '@/api';
import { setInitialData } from '../slices/appSlice';

export const initializeDataMiddleware = (store) => (next) => async (action) => {
  if (action.type === '@@INIT') {
    try {
      const data = await fetchGlobalsData();
      console.log('data Middleware', data);
      store.dispatch(setInitialData(data));
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    }
  }
  return next(action);
};
