import {colors} from '../../theme/colors';

const colorArray = [
  colors.blue,
  colors.green,
  colors.orange,
  colors.violet,
  colors.yellow,
  colors.red,
];

const idToColorMap: Record<string | number, string> = {};

export const getColorById = (id: string | number): string => {
  const idStr = String(id);

  if (idToColorMap[idStr]) return idToColorMap[idStr];

  const hash = Array.from(idStr).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );
  const colorIndex = hash % colorArray.length;
  idToColorMap[idStr] = colorArray[colorIndex];

  return colorArray[colorIndex];
};
