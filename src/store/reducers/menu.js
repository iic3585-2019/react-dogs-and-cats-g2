import { MENU_OPEN, MENU_CLOSE, MENU_TOGGLE } from '../actions/menu/types';

const initialState = {
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_OPEN:
      return { ...state, isOpen: true };
    case MENU_CLOSE:
      return { ...state, isOpen: false };
    case MENU_TOGGLE:
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};
