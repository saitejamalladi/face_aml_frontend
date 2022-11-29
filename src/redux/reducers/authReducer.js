import * as types from "../../constants";

export default function reducer(state = {}, actions) {
  switch (actions.type) {
    case types.AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        user: {
          id: actions.id,
          email: actions.email,
          name: actions.name,
          role: actions.role,
        },
      };

    case types.AUTH_SIGN_OUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
