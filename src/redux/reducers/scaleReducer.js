import * as types from "../../constants";
import { SET_ACCOUNT_STACK } from "../../constants";
const initialState = {
  accountStack: [],
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_ACCOUNT_STACK:
      return {
        ...state,
        accountStack: actions.accountStack,
      };
    case types.ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        accounts: actions.accounts,
      };
    case types.ACCOUNTS_FETCH_FAILURE:
      return {
        ...state,
        accounts: [],
      };
    case types.CHILD_ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        accounts: actions.accounts,
      };
    case types.CHILD_ACCOUNTS_FETCH_FAILURE:
      return {
        ...state,
        accounts: [],
      };
    case types.USERS_FETCH_SUCCESS:
      return {
        ...state,
        users: actions.users,
      };
    case types.USERS_FETCH_FAILURE:
      return {
        ...state,
        users: [],
      };
    case types.DEVICES_FETCH_SUCCESS:
      return {
        ...state,
        devices: actions.devices,
      };
    case types.DEVICES_FETCH_FAILURE:
      return {
        ...state,
        devices: [],
      };
    case types.SCALES_FETCH_SUCCESS:
      return {
        ...state,
        scales: actions.scales,
      };
    case types.FETCH_MEAL_COUNT_SUCCESS:
      return {
        ...state,
        mealCount: actions.mealCount,
      };
    case types.FETCH_MEAL_COUNT_FAILURE:
      return {
        ...state,
        mealCount: [],
      };
    case types.FETCH_BENCHMARK_SUCCESS:
      return {
        ...state,
        benchmark: actions.benchmark,
      };
    case types.FETCH_BENCHMARK_FAILURE:
      return {
        ...state,
        benchmark: [],
      };
    case types.REPORT_FETCH_SUCCESS:
      return {
        ...state,
        reportData: actions.reportData,
      };

    case types.REPORT_FETCH_FAILURE:
      return {
        ...state,
        reportData: null,
      };

    default:
      return state;
  }
}
