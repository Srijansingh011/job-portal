import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import {
    persistStore,
    persistReducer,
    createTransform,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

// Always force loading=false — never save or restore a stale spinner state
const resetLoadingTransform = createTransform(
    (inboundState) => ({ ...inboundState, loading: false }), // before saving
    (outboundState) => ({ ...outboundState, loading: false }), // after loading
    { whitelist: ['auth'] }
);

const persistConfig = {
    key: 'root',
    version: 3,   // bumped to clear old stuck loading:true from localStorage
    storage,
    blacklist: ['job', 'application'],
    transforms: [resetLoadingTransform],
}

const rootReducer = combineReducers({
    auth:authSlice,
    job:jobSlice,
    company:companySlice,
    application:applicationSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;