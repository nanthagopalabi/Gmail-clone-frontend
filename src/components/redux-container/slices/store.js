import { configureStore } from '@reduxjs/toolkit';
import emailSlice from './emailSlice';
import storage from 'redux-persist/lib/storage'
import { persistStore,persistReducer,
    FLUSH,REHYDRATE,PAUSE,PERSIST,
    PURGE,REGISTER } from 'redux-persist'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, emailSlice);

const store = configureStore({
    reducer: {email:persistedReducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
      }),
});
const persistor = persistStore(store);
export default { store, persistor };