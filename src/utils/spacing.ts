/**
 * スペーシングのサイズを表す型
 * -3から7までの数値、またはundefinedを指定可能
 */
export type SpaceSize = -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined;

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