import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../reducers/reducer";
import {
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
} from "react-redux";

export const store = configureStore({
	reducer: reducers,
});
export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
