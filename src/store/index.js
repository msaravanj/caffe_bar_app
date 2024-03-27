import { createSlice, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["role", "email"],
  stateReconciler: autoMergeLevel2,
};

const userDataState = {
  id: null,
  role: 0,
  email: null,
  lastname: null,
  name: null,
  password: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState: userDataState,
  reducers: {
    updateUserData(state, action) {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.lastname = action.payload.lastname;
      state.name = action.payload.name;
      state.password = action.payload.password;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, userDataSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const userDataActions = userDataSlice.actions;
export const userRole = userDataSlice.getInitialState.role;
export const persistor = persistStore(store);

export default store;
