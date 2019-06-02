import { PROFILE_UPDATE } from '../actions/profile/types';

const initialState = {
  mealsPerDay: 2,
  weeklyWalks: 5,
  hoursAlone: 8,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
