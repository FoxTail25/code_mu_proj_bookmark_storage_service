<script>
export default {
	props: {
		msg: String,
		num: Number,
	},
	computed: {
		classN() {
			return this.num
				? "text-center fs-" + this.num
				: "text-center fs-4"
		}
	}

}
</script>

<template>
	<header>
		<h2 :class="classN">{{ msg }}</h2>
	</header>
</template>