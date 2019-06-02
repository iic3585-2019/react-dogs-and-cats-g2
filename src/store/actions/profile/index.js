import { PROFILE_UPDATE } from './types';

// eslint-disable-next-line import/prefer-default-export
export const updateProfile = (payload) => ({
  type: PROFILE_UPDATE,
  payload,
});
