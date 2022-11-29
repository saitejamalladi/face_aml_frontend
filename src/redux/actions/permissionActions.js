import * as types from "../../constants";
import {
    fetchPermissions as fetchPermissionsService
} from "../../services/permissionService";

import { AUTH_TOKEN } from "../../constants";

export function fetchPermissions() {
    return async (dispatch) => {
      let token = localStorage.getItem(AUTH_TOKEN);
      if (token) {
        return fetchPermissionsService(token)
          .then((response) => {
            dispatch({
              type: types.PERMISSION_FETCH_SUCCESS,
              permissions: response
            });
          })
          .catch((error) => {
            throw error;
          });
      } else {
        return dispatch({ type: types.PERMISSION_FETCH_FAILURE });
      }
    };
  }