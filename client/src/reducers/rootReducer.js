import { combineReducers } from "redux";
import boards from "./boards";
import cards from "./cards";
import board from "./board";
import lists from "./lists";

const rootReducer = combineReducers({ boards, board, cards, lists });

export default rootReducer;
