import { configureStore } from "@reduxjs/toolkit";
import login_reducer from "./slices/login";
import home_reducer from "./slices/home";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage'
import { persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const reducer = combineReducers({
    login: login_reducer,
    home: home_reducer
});

const persist_reducer = persistReducer({
    key: "root",
    blacklist: Object.keys(reducer),
    whitelist: ["login", "home"],
    storage,
    stateReconciler: autoMergeLevel2
}, reducer);

const store = configureStore({
    reducer: persist_reducer
});

const persistor = persistStore(store);

export { store, persistor };