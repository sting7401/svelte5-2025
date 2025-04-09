<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
let isLeftHovered = $state(false);
let button: HTMLButtonElement | HTMLAnchorElement;

type Props = (
	| (HTMLButtonAttributes & { href?: never })
	| (HTMLAnchorAttributes & { href?: string })
) & {
	left?: Snippet<[boolean]>;
	right?: Snippet;
	children: Snippet<[boolean]>;
	size?: 'py-10' | 'py-15';
	shadow?: boolean;
	bgColor?: string;
	textColor?: string;
	rounded?: string;
	props?: string | boolean | undefined;
	onClick?: (e: Event) => void;
	onLeftHover?: () => void;
};

let {
	left,
	right,
	children,
	size = 'py-10',
	shadow = false,
	bgColor,
	textColor,
	rounded = '',
	onClick,
	onLeftHover,
	...props
}: Props = $props();

export function focus() {
	button.focus();
}

export function getButton() {
	return button;
}
</script>

<style>
:global(html) {
	:root {
		--20: 1.25rem;
	}

	/* background-color: aqua; */
}
</style>

<svelte:element
	this={props?.href ? 'a' : 'button'}
	bind:this={button}
	class="gpa-2 flex rounded-sm bg-red-600 p-5 text-white {rounded && `mt-(${rounded})`}"
	class:py-10={size === 'py-10'}
	class:shadow-xl={shadow}
	target={props?.href ? '_blank' : ''}
	onclick={onClick}
	onmouseover={() => {
		onLeftHover?.();
		isLeftHovered = true;
	}}
	onmouseleave={() => {
		isLeftHovered = false;
	}}
	{...props}
>
	<!-- <button
	type="button"
	class="gpa-2 flex rounded-sm bg-red-600 p-5 text-white {rounded && `mt-(${rounded})`}"
	class:py-10={size === 'py-10'}
	class:shadow-xl={shadow}
	style:background-color={bgColor}
	style:color={textColor}
	{...props}
> -->
	<!-- <button
	type="button"
	class="gpa-2 flex rounded-sm bg-red-600 p-5 text-white {{
		'py-10': size === 'py-10',
		'py-15': size === 'py-15',
		shadow
	}}"
	class:shadow-xl={shadow}
> -->
	<!-- <button
	type="button"
	class="gpa-2 flex rounded-sm bg-red-600 p-5 text-white {[
		size === 'py-10' && 'py-10',
		size === 'py-15' && 'py-15',
		shadow && 'shadow-lg',
		_class
	]}"
> -->
	{#if left}
		<span role="presentation" class="mr-2">
			{@render left?.(isLeftHovered)}
		</span>
	{/if}
	{@render children?.()}

	{#if right}
		<span class="ml-2">
			{@render right?.()}
		</span>
	{/if}
</svelte:element>
