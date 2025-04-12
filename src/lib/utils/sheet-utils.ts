export type Cell = {
	value?: string;
	bgColor?: string;
	color?: string;
};

// 알파벳 문자열을 숫자로 변환합니다. 예를 들어, "A"는 1, "B"는 2, "AA"는 27이 됩니다.
export const alphabetToNumber = (letters: string) => {
	return letters.split('').reduce((prev, next) => prev * 26 + parseInt(next, 36) - 9, 0);
};

// 엑셀 스타일의 셀 주소 (예: "A1", "BC23")를 컬럼과 로우 인덱스로 변환합니다.
export const cellToIndex = (cell: string) => {
	const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g');
	const colRow = cell.match(regex);

	return {
		// 컬럼 인덱스는 alphabetToNumber 함수를 사용하여 계산합니다.
		col: alphabetToNumber(colRow?.[0] || ''),
		// 로우 인덱스는 문자열을 숫자로 변환합니다.
		row: Number(colRow?.[1]),
	};
};
// 엑셀 컬럼 문자를 저장하는 배열입니다.
const chars = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];
// 숫자를 엑셀 컬럼 문자열로 변환하는 함수입니다.
// https://www.npmjs.com/package/number-to-excel-header 참고
export function numberToAlphabet(index: number): string {
	// 엑셀 컬럼은 1부터 시작하므로 인덱스를 1 감소시킵니다.
	index -= 1;

	// 26으로 나눈 몫을 계산합니다.
	const quotient = Math.floor(index / 26);
	// 몫이 0보다 크면 재귀적으로 함수를 호출하여 상위 자릿수를 계산합니다.
	if (quotient > 0) {
		return numberToAlphabet(quotient) + chars[index % 26];
	}

	// 몫이 0이면 현재 자릿수에 해당하는 문자를 반환합니다.
	return chars[index % 26];
}
