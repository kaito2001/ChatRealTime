import { combineReducers } from "redux";

const USER = {
  uid: "",
  token: "",
  display_name: "",
  ID: {
    id: 0,
  },
};

const MESS = {
  mes: [],
};

function User(state = USER, action) {
  switch (action.type) {
    case "ADD_USER":
      const user = action.payload;
      state.uid = user.uid;
      state.token = user.token;
      state.display_name = user.display_name;
      return {
        ...state,
      };
    case "EDIT_ID_ROOM":
      state.ID.id = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
}

function Mes(state = MESS, action) {
  switch (action.type) {
    case "ADD_MESSAGE":
      const mesHis = action.payload;
      return { ...state, mes: mesHis };
    default:
      return state;
  }
}

export const reducer = combineReducers({
  User,
  Mes,
});
