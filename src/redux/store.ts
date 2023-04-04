import { configureStore } from '@reduxjs/toolkit';
import formReducer from './form.reducer';

export const store = configureStore({
    reducer: {
        form: formReducer,
    },
});

// * Lấy rootstate và addDispatch từ store của ta
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
