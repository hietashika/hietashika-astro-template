/**
 * スペーシングのサイズを表す型
 * -3から7までの数値、またはundefinedを指定可能
 */
export type SpaceSize = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined;

/**
 * パディングの値を表す型
 * 単一の値、または1-4つの値をスペース区切りで指定可能
 */
export type PaddingValue = SpaceSize | string;

/**
 * ギャップの設定を表す型
 * 単一の値、文字列、または行と列の値を指定可能
 */
export type GapValue = SpaceSize | string | {
  row?: SpaceSize;
  column?: SpaceSize;
};

/**
 * 指定されたプレフィックスとサイズに基づいてスペーシングのクラス名を生成する
 * @param prefix - クラス名のプレフィックス（例: "gap"）
 * @param size - スペーシングのサイズ
 * @returns BEM形式のクラス名
 * @example
 * getSpacingClass("gap", 1) // => "gap--1"
 * getSpacingClass("gap", -3) // => "gap--minus3"
 * getSpacingClass("gap", undefined) // => "gap--default"
 */
export const getSpacingClass = (prefix: string, size?: SpaceSize): string => {
  if (size === undefined) return `${prefix}--default`;
  if (size === 0) return `${prefix}--0`;
  
  // 負の値の場合（小さいスペース）
  if (size < 0) {
    const index = Math.abs(size);
    return `${prefix}--minus${index}`;
  }
  
  // 正の値の場合（大きいスペース）
  return `${prefix}--${size}`;
};

/**
 * パディング値を解析してSpaceSizeの配列に変換する
 * @param value - パディング値（単一の値または1-4つの値をスペース区切りで指定）
 * @returns SpaceSizeの配列（上、右、下、左の順）
 * @example
 * parsePaddingValue("1") // => [1, 1, 1, 1]
 * parsePaddingValue("1 2") // => [1, 2, 1, 2]
 * parsePaddingValue("1 2 3") // => [1, 2, 3, 2]
 * parsePaddingValue("1 2 3 4") // => [1, 2, 3, 4]
 */
export const parsePaddingValue = (value: PaddingValue): SpaceSize[] => {
  // 数値の場合は全方向同じ値を返す
  if (typeof value === "number") {
    return [value, value, value, value];
  }

  // 文字列の場合はスペースで分割して解析
  if (typeof value === "string") {
    const values = value.split(" ").map(v => parseInt(v) as SpaceSize);
    
    switch (values.length) {
      case 1: // 全方向同じ値
        return [values[0], values[0], values[0], values[0]];
      case 2: // 上下、左右
        return [values[0], values[1], values[0], values[1]];
      case 3: // 上、左右、下
        return [values[0], values[1], values[2], values[1]];
      case 4: // 上、右、下、左
        return values;
      default:
        throw new Error("Invalid padding value format");
    }
  }

  // undefined の場合はデフォルト値を返す
  return [undefined, undefined, undefined, undefined];
};

/**
 * パディングのクラス名を生成する
 * @param value - パディング値
 * @returns パディングのクラス名の配列
 */
export const getPaddingClasses = (value: PaddingValue): string[] => {
  const [top, right, bottom, left] = parsePaddingValue(value);
  
  return [
    getSpacingClass("padding-top", top),
    getSpacingClass("padding-right", right),
    getSpacingClass("padding-bottom", bottom),
    getSpacingClass("padding-left", left),
  ];
};

/**
 * ギャップ値を解析して[row, column]の形式に変換する
 * @param value - ギャップ値
 * @returns [row, column]の形式の配列
 * @example
 * parseGapValue("1 3") // => [1, 3]
 * parseGapValue("2") // => [2, 2]
 */
export const parseGapValue = (value: GapValue): [SpaceSize, SpaceSize] => {
  // 数値の場合は両方同じ値を返す
  if (typeof value === "number") {
    return [value, value];
  }

  // 文字列の場合はスペースで分割して解析
  if (typeof value === "string") {
    const values = value.trim().split(/\s+/).map(v => parseInt(v) as SpaceSize);
    return values.length === 1 ? [values[0], values[0]] : [values[0], values[1]];
  }

  // オブジェクトの場合
  if (typeof value === "object" && value !== null) {
    return [value.row, value.column];
  }

  // undefinedの場合はデフォルト値を返す
  return [undefined, undefined];
};

/**
 * ギャップのクラス名を生成する
 * @param value - ギャップ値
 * @returns ギャップのクラス名の配列
 */
export const getGapClasses = (value: GapValue): string[] => {
  const [row, column] = parseGapValue(value);
  
  const classes: string[] = [];
  if (row !== undefined) {
    classes.push(getSpacingClass("row-gap", row));
  }
  if (column !== undefined) {
    classes.push(getSpacingClass("column-gap", column));
  }
  return classes;
}; 