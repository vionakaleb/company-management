import { configureStore } from '@reduxjs/toolkit';
import formReducer from './form.reducer';
import { companyApi } from 'api/company';
import { officeApi } from 'api/office';

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(companyApi.middleware, officeApi.middleware),
    reducer: {
        form: formReducer,
        [companyApi.reducerPath]: companyApi.reducer,
        [officeApi.reducerPath]: officeApi.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
