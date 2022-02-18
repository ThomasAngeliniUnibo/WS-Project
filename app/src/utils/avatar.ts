import * as colors from '@mui/material/colors';

export const avatarLetters = (firstName: string, lastName: string): string =>
  firstName.charAt(0) + lastName.charAt(0);

export const avatarColors = (firstName: string, lastName: string): string => {
  const seed = firstName.charCodeAt(0) + lastName.charCodeAt(0);
  return randomColor(600, seed);
};

type Tone = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export const randomColor = (tone: Tone, seed: number): string => {
  const colorsArray = Object.values(colors);
  const n = seed % colorsArray.length;
  return colorsArray[n][tone];
};
