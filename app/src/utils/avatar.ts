import * as colors from "@mui/material/colors";

export const avatarLetters = (firstName: string, lastName: string): string =>
  firstName.charAt(0) + lastName.charAt(0);

export const avatarColors = (firstName: string, lastName: string): string => {
  const seed = firstName.charCodeAt(0) + lastName.charCodeAt(0)
  const colorsArray = Object.values(colors);
  const n = seed % colorsArray.length;
  return colorsArray[n][600];
}