<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { AddManualBtnsAnim } from '../webkit-components/buttonsAnimated';
	import { AddManualRipples } from '../webkit-components/ripples';
	import axios from 'axios';
	import Load from '../lib/Load.svelte';
	import Alert from '../lib/Alert.svelte';

	const cdnImport = [
		'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
		'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'
	];
	let isLoading = true;
	let isLoaded = false;
	let isResult = false;
	let msgAlert = '';
	let openAlert = false;
	let URLOrigin = '';
	let URLRoute = '';
	let newURL = '';
	let setTime: any = '';
	const onCopy = () => {
    openAlert = true;
    msgAlert = "Copiado!";
    navigator.clipboard.writeText(newURL);
    clearTimeout(setTime);
    setTime = setTimeout(() => {
      openAlert = false;
      msgAlert = "";
    }, timeAlert);
  };
	const timeAlert: number = 2000;
	const validate = () => {
		isResult = false;
		if (URLOrigin !== '' && URLRoute !== '') {
			isLoading = true;
			axios
				.post('https://3000-franciscojefer-urlshort-zyhc8q8rlej.ws-us63.gitpod.io/set', {
					origin: URLOrigin,
					route: URLRoute
				})
				.then((response: any) => {
					if(response.data.ok) {
						isLoading = false;
						isResult = true;
						console.log(response)
						newURL = response.data.url
					}
				})
				.catch((error: any) => {
					isLoading = false;
					isResult = false;
					openAlert = true;
			    msgAlert = error.response.data;
			    clearTimeout(setTime);
			    setTime = setTimeout(() => {
				    openAlert = false;
				    msgAlert = '';
			    }, timeAlert);
				});
		} else {
			openAlert = true;
			msgAlert = 'Preencha todos os campos!';
			clearTimeout(setTime);
			setTime = setTimeout(() => {
				openAlert = false;
				msgAlert = '';
			}, timeAlert);
		}
	};
	let msgLoading = 'Carregando...';
	const addAnimations = () => {
		const btnsAnimated: any = document.querySelectorAll<HTMLButtonElement>('.btn-anim')!;
		const btnsRipple: any = document.querySelectorAll<HTMLButtonElement>('.ripples')!;
		AddManualBtnsAnim(btnsAnimated);
		AddManualRipples(btnsRipple);
	};
	const addAnimationsResult = () => {
		const btnsRippleResult: any = document.querySelectorAll<HTMLButtonElement>('.ripples-result')!;
		AddManualRipples(btnsRippleResult);
	};
	onMount(async () => {
		(await import(cdnImport[0])).default;
		(await import(cdnImport[1])).default;
		isLoading = false;
		isLoaded = true;
	});
</script>

<main class="page">
	<Alert msg={msgAlert} {openAlert} />
	<Load {isLoading} {msgLoading} />
	<div class="container-fluid">
		{#if isLoaded}
			<div
				class="page__card"
				transition:fade={{ duration: 200 }}
				on:introend={() => addAnimations()}
			>
				<h1 class="text-h1">Encurtador de URL</h1>
				<div class="form-input">
					<label for="url-origin">URL original:</label>
					<input
						type="text"
						class="wk-input-text text-left"
						bind:value={URLOrigin}
						id="url-origin"
						placeholder="URL original..."
					/>
				</div>
				<div class="form-input url-short">
					<label for="url-short">Rota da URL encurtada:</label>
					<div class="flex">
						<input
							type="text"
							class="wk-input-text text-left domain"
							value="https://3000-franciscojefer-urlshort-zyhc8q8rlej.ws-us63.gitpod.io/"
							readonly
						/>
						<input
							type="text"
							class="wk-input-text text-left"
							id="url-short"
							placeholder="Rota..."
							bind:value={URLRoute}
						/>
					</div>
				</div>
				<button class="wk-btn btn-anim ripples" on:click={validate}>
					<ion-icon name="refresh-outline" />
					Gerar URL encurtada
				</button>
			</div>
			{#if isResult}
				<div
					class="page__card result-container"
					transition:fade={{ duration: 200 }}
					on:introend={() => addAnimationsResult()}
				>
					<h1 class="text-h1">URL encurtada:</h1>
					<div class="container">
						<input
							type="text"
							class="wk-input-text text-left domain"
							bind:value={newURL}
							readonly
						/>
						<button class="wk-btn ripples-result" on:click={onCopy}>
							<ion-icon name="copy-outline" />
						</button>
					</div>
				</div>
			{/if}
		{/if}
	</div>
</main>

<style lang="scss">
	.page {
		width: 100%;
		height: 100%;
		background-color: rgb(var(--bg-color));
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 0.5em;
		& .container-fluid {
			margin: auto;
		}
		&__card {
			&:nth-child(1) {
				margin-bottom: 0.5em;
			}
			&:nth-child(2) {
				margin-top: 0.5em;
			}
			& .container {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-evenly;
				column-gap: 0.5em;
				& input {
					border: none;
				}
				& button {
					width: 2.5em;
					width: 2.5em;
					background-color: transparent;
					color: rgb(var(--text-color));
					--rp-color: var(--ripple-color);
					--rp-transition: 200;
					--brd-radius: 1em;
				}
			}
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
			& .form-input {
				width: 100%;
				& .flex {
					display: flex;
					& .domain {
						border: none;
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
				--brd-size: 0.09em;
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
