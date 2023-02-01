import { InitialState } from "./interfaces";
import { ActionNames } from "./actions";

type actionPayload<T> = {
  [k in keyof T]?: T[k];
};

export type actionType = {
  type: ActionNames,
  payload?: actionPayload<InitialState>
}

export type ReducerType = (state: InitialState, action: actionType) => InitialState;

export function rootReducer(
  state: InitialState, 
  action: actionType) {
    switch (action.type) {
      case ActionNames.SET_TEAM:
        return { ...state, team: action.payload?.team ?? [] };
      case ActionNames.SET_BUDDY:
        return { ...state, buddy: action.payload?.buddy ?? null };
      case ActionNames.SET_ERROR:
        return { ...state, error: true, success: false, fetching: false };
      case ActionNames.SET_FETCHING:
        return { ...state, fetching: true, success: false, error: false };
      case ActionNames.SET_SUCCESS:
        return { ...state, success: true, fetching: false, error: false };
      default:
        return state;
    }
  }