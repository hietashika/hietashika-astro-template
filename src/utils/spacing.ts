import { error } from "node_modules/astro/dist/core/logger/core";

/**
 * パディング値の型定義
 */
export type PaddingValue = string | number | undefined;

/**
 * ギャップ値の型定義
 */
export type GapValue = string | number | undefined;

/**
 * CSSのショートハンド記法に対応したパディングクラスを生成する
 *
 * @param paddingValue - パディング値（例: "0", "1 2", "1 2 3", "1 2 3 4"）
 * @returns パディングクラス文字列
 *
 * 使用例:
 * - generatePaddingClasses("3") → "pt--3 pr--3 pb--3 pl--3"
 * - generatePaddingClasses("3 5") → "pt--3 pr--5 pb--3 pl--5"
 * - generatePaddingClasses("1 2 3") → "pt--1 pr--2 pb--3 pl--2"
 * - generatePaddingClasses("1 2 3 4") → "pt--1 pr--2 pb--3 pl--4"
 */
export const paddingClasses = (paddingValue: PaddingValue): string => {
	const values = String(paddingValue).split(" ");

	// 値がundefinedの場合は空文字を返す
	if (paddingValue === undefined) {
		return "";
	}

	// 値の数に応じて異なる処理を実行
	if (values.length === 1) {
		// 1つの値: すべての方向に同じ値を適用
		const value = values[0];
		return `pt:${value} pr:${value} pb:${value} pl:${value}`;
	}

	if (values.length === 2) {
		// 2つの値: 上下、左右
		const [vertical, horizontal] = values;
		return `pt:${vertical} pr:${horizontal} pb:${vertical} pl:${horizontal}`;
	}

	if (values.length === 3) {
		// 3つの値: 上、左右、下
		const [top, horizontal, bottom] = values;
		return `pt:${top} pr:${horizontal} pb:${bottom} pl:${horizontal}`;
	}

	if (values.length === 4) {
		// 4つの値: 上、右、下、左
		const [top, right, bottom, left] = values;
		return `pt:${top} pr:${right} pb:${bottom} pl:${left}`;
	}

	// デフォルト（不正な値の場合）
	return "";
};

/**
 * padding-inline クラスを生成する
 *
 * @param paddingValue - パディング値（例: "0", "1", "1 2"）
 * @returns パディングクラス文字列
 */
export const paddingInlineClasses = (paddingValue: PaddingValue): string => {
	const values = String(paddingValue).split(" ");

	// 値がundefinedの場合は空文字を返す
	if (paddingValue === undefined) {
		return "";
	}

	// 値の数に応じて異なる処理を実行
	if (values.length === 1) {
		// 1つの値: すべての方向に同じ値を適用
		const value = values[0];
		return `pi:${value}`;
	}

	// デフォルト（不正な値の場合）
	return "";
};

/**
 * ギャップ値からCSSクラスを生成する
 *
 * @param gapValue - ギャップ値
 * @returns ギャップクラス文字列
 */
export const gapClasses = (gapValue: GapValue): string => {
	const value = String(gapValue).split(" ");

	// 値がundefinedの場合は空文字を返す
	if (gapValue === undefined) {
		return "";
	}

	// 値の数に応じて異なる処理を実行
	if (value.length === 1) {
		// 1つの値を適用
		return `g:${value}`;
	}

	if (value.length === 2) {
		// 2つの値を適用
		const [row, column] = value;
		return `rg:${row} cg:${column}`;
	}

	// デフォルト（不正な値の場合）
	return "";
};
