import { combineReducers } from "@reduxjs/toolkit";
import { reducer } from "../slice/board";

export const reducers = combineReducers({
	tyra: reducer,
});
