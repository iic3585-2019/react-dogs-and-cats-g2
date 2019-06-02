import { MENU_OPEN, MENU_CLOSE, MENU_TOGGLE } from './types';

export const openMenu = () => ({
  type: MENU_OPEN
});

export const closeMenu = () => ({
  type: MENU_CLOSE
});

export const toggleMenu = () => {
  return {
    type: MENU_TOGGLE
  };
};
