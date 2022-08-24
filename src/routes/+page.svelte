<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
  import { AddManualBtnsAnim } from '../webkit-components/buttonsAnimated';
  import { AddManualRipples } from '../webkit-components/ripples';
	import Load from '../lib/Load.svelte';

	const cdnImport = [
		'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
		'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'
	];
	let isLoading = true;
	let isLoaded = false;
	let msgLoading = 'Loading...';
	const addAnimations = () => {
		const btnsAnimated: any = document.querySelectorAll<HTMLButtonElement>('.btn-anim')!;
		const btnsRipple: any = document.querySelectorAll<HTMLButtonElement>('.ripples')!;
		AddManualBtnsAnim(btnsAnimated);
		AddManualRipples(btnsRipple);
	};
	onMount(async () => {
		(await import(cdnImport[0])).default;
		(await import(cdnImport[1])).default;
		isLoading = false;
		isLoaded = true;
	});
</script>

<main class="card">
	<Load {isLoading} {msgLoading} />
	{#if isLoaded}
		<div
			class="card__container"
			transition:fade={{ duration: 200 }}
			on:introend={() => addAnimations()}
		>
			<h1 class="text-h1">Encurtador de URL</h1>
      <div class="card__container__form-input">
				<label for="url-origin">URL original:</label>
				<input type="text" class="wk-input-text text-left" id="url-origin" placeholder="URL original...">
			</div>
      <div class="card__container__form-input url-short">
				<label for="url-short">Rota da URL encurtada:</label>
				<div class="flex">
					<input type="text" class="wk-input-text text-left domain" value="https://myDomain/" readonly>
					<input type="text" class="wk-input-text text-left" id="url-short" placeholder="Rota da URL encurtada...">
				</div>
			</div>
			<button class="wk-btn btn-anim ripples">
			  <ion-icon name="refresh-outline"></ion-icon>
				Gerar URL encurtada
			</button>
		</div>
	{/if}
</main>

<style lang="scss">
	.card {
		width: 100%;
		height: 100%;
		background-color: rgb(var(--bg-color));
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 0.5em;
		&__container {
			& h1 {
				margin-left: auto;
				margin-right: auto;
				color: rgb(var(--text-color));
			}
			& label {
				font-size: var(--fs);
				color: rgb(var(--text-color));
			}
			width: 95%;
			margin: auto;
			max-width: 500px;
			height: min-content;
			padding: 0.7em;
			border-radius: 1em;
			border: 0.1em solid rgba(var(--text-color), 0.2);
			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-direction: column;
			row-gap: 0.5em;
			&__form-input {
				width: 100%;
				& .flex {
					display: flex;
					& .domain {
						border: none;
						border-radius: 0;
					}
				}
			}
			& input {
				background-color: transparent;
				color: rgb(var(--text-color));
				font-size: var(--fs);
				padding: 0.5em;
				width: 100%;
				--brd-radius: 1em;
				--brd-color: rgba(var(--text-color), 0.2);
				--brd-size: 0.1em;
				--ph-color: rgb(var(--primary));
				--select-color: rgb(var(--primary));
				--select-color-text: rgb(255, 255, 255);
			}
			& button {
				background-color: rgb(var(--primary));
				color: rgb(255, 255, 255);
				width: 100%;
				padding: 0.5em;
				column-gap: 0.3em;
				transition: border-radius linear 200ms, box-shadow linear 200ms;
				--bsw-default: 0px 0px 0px 0px rgba(0, 0, 0, 0);
				--bsw-after: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
				--brd-default: var(--brd-radius);
				--brd-after: 0.2em;
				--rp-color: rgba(255, 255, 255, 0.2);
				--rp-transition: 200;
				--brd-radius: 1em;
			}
		}
	}
</style>