<script lang="ts">
import { alphabetToNumber, cellToIndex, numberToAlphabet, type Cell } from '$lib/utils/sheet-utils';
import { list } from 'postcss';

let { lists = $bindable([[]]) }: { lists: Cell[][] } = $props();

let editCell: string | null = $state(null);
let selectedCell: string | null = $state(null);
let selectedCellObj = $derived.by(() => {
	if (!selectedCell) return null;

	const [row, col] = selectedCell.split(',');

	return lists[+row - 1]?.[+col - 1];
});

let numRows = $derived(lists.length > 10 ? lists.length : 10);
let numCols = $derived.by(() => {
	const largestRow = Math.max(...lists.map(row => row.length));
	return largestRow > 10 ? largestRow : 10;
});

function init(el: HTMLInputElement) {
	el.focus();
	el.select();
}

function setCell(row: number, col: number, props: 'value' | 'bgColor' | 'color', value: string) {
	if (lists[row]) {
		if (lists[row][col]) {
			lists[row][col][props] = value; // Update the property directly
		} else {
			lists[row][col] = { [props]: value };
		}
	} else {
		lists[row] = [];
		lists[row][col] = { [props]: value };
	}
}

function parseValue(value: string | undefined): string | number {
	if (!value) return '';

	console.log(value);

	if (value.startsWith('=')) {
		// value 문자열이 '='로 시작하는 경우, 함수 이름을 추출합니다.
		// 예: "=SUM(A1:A3)" -> "SUM"
		// 1. '(' 문자를 기준으로 문자열을 분리하여 함수 이름과 매개변수를 나눕니다.
		// 2. 분리된 문자열의 첫 번째 부분에서 '=' 문자를 제거하고 함수 이름만 추출합니다.
		const funcName = value.split('(')[0].substring(1);
		const args = value.replace(`=${funcName}`, ``).replace(/[()]/g, '').split(',');
		const vals = args.map(arg => {
			const cell = cellToIndex(arg);
			const val = lists[cell.row - 1]?.[cell.col - 1]?.value;

			if (val?.startsWith('=')) {
				return Number(parseValue(val));
			}

			return val ? Number(val) : 0;
		});
		return vals.reduce(
			(pre, cur) => {
				if (funcName === 'SUM') {
					return pre + cur;
				} else if (funcName === 'MULTIPLY') {
					return pre * cur;
				} else if (funcName === 'DIVIDE') {
					return pre / cur;
				} else if (funcName === 'SUBTRACT') {
					return pre - cur;
				} else {
					return 0;
				}
			},
			funcName === 'MULTIPLY' ? 1 : 0,
		);
	} else {
		return value;
	}
}
</script>

<table class="sheet">
	<tbody>
		{#each { length: numRows + 1 }, row}
			<tr>
				{#each { length: numCols }, col}
					{@const cellData = lists[row - 1]?.[col - 1]?.value}
					{@const currentCell = `${row},${col}`}

					<svelte:element
						this={row === 0 || col === 0 ? 'th' : 'td'}
						scope={row === 0 ? 'col' : col === 0 ? 'row' : undefined}
						role="button"
						tabindex="0"
						class:selected={selectedCell === currentCell}
						style:background-color={lists[row - 1]?.[col - 1]?.bgColor}
						style:color={lists[row - 1]?.[col - 1]?.color}
						onclick={() => {
							if (currentCell === selectedCell || row === 0 || col === 0) {
								editCell = null;
								selectedCell = null;
								return;
							} else {
								editCell = null;
								selectedCell = currentCell;
							}
						}}
						ondblclick={() => {
							editCell = currentCell;
						}}
					>
						<!-- {currentCell} -->
						{#if row === 0 && col > 0}
							{numberToAlphabet(col)}
						{/if}

						{#if row > 0 && col === 0}
							{row}
						{/if}

						{#if row > 0 && col > 0}
							{#if editCell !== currentCell}
								{parseValue(cellData)}
							{:else}
								<input
									use:init
									type="text"
									value={parseValue(cellData) || ''}
									style:background-color={lists[row - 1]?.[col - 1]?.bgColor}
									style:color={lists[row - 1]?.[col - 1]?.color}
									oninput={e => {
										setCell(row - 1, col - 1, 'value', e.currentTarget.value);
									}}
									onkeydown={e => {
										if (e.key === 'Enter') {
											editCell = null;
										} else if (e.key === 'Escape') {
											editCell = null;
											selectedCell = null;
										}
									}}
								/>
							{/if}
						{/if}
					</svelte:element>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

{#if selectedCell}
	<label for="bgColor">Background Color:</label>
	<input
		type="color"
		id="bgColor"
		value={selectedCellObj?.bgColor || '#222222'}
		oninput={e => {
			if (!selectedCell) return;
			const [row, col] = selectedCell?.split(',');
			setCell(+row - 1, +col - 1, 'bgColor', e.currentTarget.value);
		}}
	/>
	<label for="bgColor"> Color:</label>
	<input
		type="color"
		id="bgColor"
		value={selectedCellObj?.color || '#222222'}
		oninput={e => {
			if (!selectedCell) return;
			const [row, col] = selectedCell?.split(',');
			setCell(+row - 1, +col - 1, 'color', e.currentTarget.value);
		}}
	/>
{/if}

<style lang="scss">
.sheet {
	border-collapse: collapse;
	font-family: sans-serif;
	* {
		box-sizing: border-box;
	}
	tr {
		color: #fff;

		th {
			background-color: #191919;
		}
		td {
			background-color: #222;
		}
		td.selected {
			outline: 2px solid #3257f8;
			outline-offset: -2px;
		}
		th,
		td {
			min-width: 100px;
			height: 30px;
			border: 1px solid #393939;
			span {
				padding: 5px;
				display: inline-block;
			}
			input {
				width: 100%;
				height: 100%;
				padding: 5px;
				margin: 0;
				border: none;
				font-size: 16px;
				background-color: #222;
			}
		}
	}
}
</style>
