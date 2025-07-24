import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false // Opcional: desactivar la verificación de serialización para acciones complejas
  }),
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});