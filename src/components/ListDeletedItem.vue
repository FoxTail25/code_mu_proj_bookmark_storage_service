<script setup>
import Trash from './icon/Trash.vue';
import Undo from './icon/Undo.vue';
</script>


<script>

export default {
	props: {
		dataList: Array,
		type: String,
	},
	emits: ['restore', 'permanentDelete'],
	methods: {
		res(id) {
			this.$emit('restore', `${id}`)
		},
		del(id) {
			this.$emit('permanentDelete', `${id}`)
		}
	},
}
</script>

<template>
	<div class="row justify-content-center">
		<TransitionGroup name="listDel" tag="ul" class="list-group col-12 col-md-10 col-md-10 col-lg-8 px-0">
			<li v-for="(elem) in dataList" :key="elem.id"
				class="list-group-item d-flex align-items-center justify-content-between px-0 px-sm-2 py-1">
				<span>
					<button class="btn btn-success p-1 m-0 ms-1 lh-1" @click="res(elem.id)" title="восстановить группу">
						<Undo />
					</button>
				</span>
				<span class="f1 text-center text-decoration-line-through">
					{{ type == 'record' ? elem.name : elem.section_name }}
				</span>
				<button class="btn btn-danger p-1 m-1 lh-1" title="удаление насовсем"
					@click="permanentRemoval(elem.id)">
					<Trash />
				</button>
			</li>
		</TransitionGroup>
	</div>
</template>

<style scoped>
.f1 {
	flex: 1;
}
</style>