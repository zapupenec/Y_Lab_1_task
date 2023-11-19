import { detectOS } from '../lib';

export const shortcuts = {
  altPlusEnter: {
    text: detectOS() === 'Mac OS' ? 'Option + Enter ↵' : 'Alt + Enter ↵',
    keys: ['Alt', 'Enter'],
  },
};
