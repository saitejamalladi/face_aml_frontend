import * as types from "../../constants";
import {
  addAccount as addAccountService,
  editAccount as editAccountService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  fetchAccounts as fetchAccountsService,
  fetchChildAccounts as fetchChildAccountsService,
  addUser as addUserService,
  fetchUsers as fetchUsersService,
  fetchDevices as fetchDevicesService,
  fetchScales as fetchScalesService,
  addMealCount as addMealCountService,
  fetchMealCount as fetchMealCountService,
  updateMealCount as updateMealCountService,
  fetchBenchmark as fetchBenchmarkService,
  updateBenchmark as updateBenchmarkService,
  fetchReport as fetchReportService,
} from "../../services/scaleService";

import { AUTH_TOKEN } from "../../constants";

export function addAccount(account) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return addAccountService(token, account)
        .then(() => {
          dispatch({
            type: types.ADD_ACCOUNT_SUCCESS,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.ADD_ACCOUNT_FAILURE });
    }
  };
}

export function editAccount(account) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return editAccountService(token, account)
        .then(() => {
          dispatch({
            type: types.EDIT_ACCOUNT_SUCCESS,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.EDIT_ACCOUNT_FAILURE });
    }
  };
}
export function fetchAccounts() {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchAccountsService(token)
        .then((response) => {
          dispatch({
            type: types.ACCOUNTS_FETCH_SUCCESS,
            accounts: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.ACCOUNTS_FETCH_FAILURE });
    }
  };
}
export function setAccountStack(accountStack) {
  return {
    type: types.SET_ACCOUNT_STACK,
    accountStack: accountStack,
  };
}

export function fetchChildAccounts(accountId) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchChildAccountsService(token, accountId)
        .then((response) => {
          dispatch({
            type: types.CHILD_ACCOUNTS_FETCH_SUCCESS,
            accounts: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.CHILD_ACCOUNTS_FETCH_FAILURE });
    }
  };
}
export function addUser(user) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return addUserService(token, user)
        .then(() => {
          dispatch({
            type: types.ADD_USER_SUCCESS,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.ADD_USER_FAILURE });
    }
  };
}
export function updateUser(user) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return updateUserService(token, user)
        .then(() => {
          dispatch({
            type: types.UPDATE_USER_SUCCESS,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.UPDATE_USER_FAIL });
    }
  };
}
export function deleteUser(username) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return deleteUserService(token, username)
        .then(() => {
          dispatch({
            type: types.DELETE_USER_SUCCESS,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.DELETE_USER_FAIL });
    }
  };
}
export function fetchUsers() {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchUsersService(token)
        .then((response) => {
          dispatch({
            type: types.USERS_FETCH_SUCCESS,
            users: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.USERS_FETCH_FAILURE });
    }
  };
}
export function fetchDevices(accountId) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchDevicesService(token, accountId)
        .then((response) => {
          dispatch({
            type: types.DEVICES_FETCH_SUCCESS,
            devices: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.DEVICES_FETCH_FAILURE });
    }
  };
}
export function fetchScales(accountId) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchScalesService(token, accountId)
        .then((response) => {
          dispatch({
            type: types.SCALES_FETCH_SUCCESS,
            scales: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.SCALES_FETCH_FAILURE });
    }
  };
}
export function addMealCount(mealCountForm) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return addMealCountService(token, mealCountForm)
        .then(() => {
          dispatch({
            type: types.ADD_USER_SUCCESS,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.ADD_USER_FAILURE });
    }
  };
}
export function updateMealCount(mealCountForm) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return updateMealCountService(token, mealCountForm)
        .then(() => {
          dispatch({
            type: types.ADD_USER_SUCCESS,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.ADD_USER_FAILURE });
    }
  };
}
export function fetchMealCount() {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchMealCountService(token)
        .then((response) => {
          dispatch({
            type: types.FETCH_MEAL_COUNT_SUCCESS,
            mealCount: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.FETCH_MEAL_COUNT_FAILURE });
    }
  };
}
export function updateBenchmark(benchmarkObj) {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return updateBenchmarkService(token, benchmarkObj)
        .then(() => {
          dispatch({
            type: types.UPDATE_BENCHMARK_SUCCESS,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.UPDATE_BENCHMARK_FAILURE });
    }
  };
}
export function fetchBenchmark() {
  return async (dispatch) => {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchBenchmarkService(token)
        .then((response) => {
          dispatch({
            type: types.FETCH_BENCHMARK_SUCCESS,
            benchmark: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.FETCH_BENCHMARK_FAILURE });
    }
  };
}
export function fetchReport(accountId, reportDate) {
  return async (dispatch) => {
    dispatch({
      type: types.REPORT_FETCH_SUCCESS,
      reportData: null,
    });
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      return fetchReportService(token, accountId, reportDate)
        .then((response) => {
          dispatch({
            type: types.REPORT_FETCH_SUCCESS,
            reportData: response,
          });
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return dispatch({ type: types.REPORT_FETCH_FAILURE });
    }
  };
}
