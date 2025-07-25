import {colors} from '../../theme/colors';

const avatarColors = [
  colors.blue,
  colors.green,
  colors.orange,
  colors.violet,
  colors.yellow,
  colors.red,
];

const validStartChars =
  "abcdefghijklmnopqrstuvwxyz0123456789!#$%&'*+-/=?^_`{|}~";

const charToColorIndexMap: Record<string, number> = {};
const chunkSize = Math.ceil(validStartChars.length / avatarColors.length);

[...validStartChars].forEach((char, index) => {
  const groupIndex = Math.floor(index / chunkSize);
  charToColorIndexMap[char] = groupIndex;
});

export const getColorByEmail = (email: string) => {
  const firstChar = email.trim().charAt(0).toLowerCase();
  const index = charToColorIndexMap[firstChar] ?? 0;
  return avatarColors[index];
};
