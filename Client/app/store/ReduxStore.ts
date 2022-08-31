import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import AuthSlice from "./AuthSlice"
import {PreloadedState} from "redux"

// export const store = configureStore({
//     reducer: {
//         // [AuthApiRtk.reducerPath]: AuthApiRtk.reducer,
//         Auth: AuthSlice,
//     },
//     // middleware: (getDefaultMiddleware =>
//     //     getDefaultMiddleware().concat(AuthApiRtk.middleware))
// })

const rootReducer = combineReducers({
	Auth: AuthSlice,
})
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

// export default store
// // Infer the `RootState` and `AppDispatch` types.ts from the store itself
// export type RootState = ReturnType<typeof store.getState>
// export type AppStore = typeof store
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
//
export const store = setupStore()
