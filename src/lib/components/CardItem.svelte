<script>
	export let title = '';
</script>

<div class="bg-gray-200 text-gray-700 shadow-lg p-3 rounded">
	<h2 class="p-2 border-b-2 border-black text-base font-bold">{title}</h2>
	<div class="p-2">
		<slot />
	</div>
	<div class="flex justify-end">
		<slot name="buttons" />
	</div>
</div>
