import * as types from "../../constants";

export default function reducer(state = {}, actions) {
  switch (actions.type) {
    case types.PERMISSION_FETCH_SUCCESS:
      return {
        ...state,
        permissions: []
      };

    case types.PERMISSION_FETCH_FAUILURE:
      return {
        ...state,
        permission: null,
      };
    
      case types.PERMISSIONS:
        return {
          ...state,
          permission: {
            ...actions.res_data
          }
        }

    default:
      return state;
  }
}