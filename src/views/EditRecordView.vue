<script setup>
import PageHeader from '@/components/PageHeader.vue';
import { useBookmarkStore } from '@/stores/bookmarks';
import IconArrowDown from '@/components/icon/IconArrowDown.vue';
import IconArrowUp from '@/components/icon/IconArrowUp.vue';
import EditText from '@/components/icon/EditText.vue';
import SaveText from '@/components/icon/SaveText.vue';
</script>

<script>
let store;
export default {
	data() {
		return {
			bookmarkArr: [],
			selectedToEdit: 'Выберите имя группы',
			selectedToDelete: 'Выберите имя записи',
			editNewLinkRecord: {
				link: '',
				name: '',
				description: '',
			},
			editOldLinkRecord: {
				link: '',
				name: '',
				description: '',
			},
		}
	},
	methods: {
		changeOrder(id, direct) {
			store.changeRecordOrder(this.selectedToEdit, id, direct);
		},
		checkUp(num) {
			return num == 0
				? true
				: false
		},
		checkDown(num) {
			return num == this.getSelectedGroupRecord.length - 1
				? true
				: false
		},
		addNewLinkInGroup() {
			let blankField = false;
			for (let record in this.editNewLinkRecord) {
				if (!this._checkText(this.editNewLinkRecord[record])) {
					blankField = record;
					break
				}
			}
			if (!blankField) {
				console.log('!все поля заполнены!');
				store.addNewLinkRecord(this.selectedToEdit, this.editNewLinkRecord);
				this.editNewLinkRecord = {
					link: '',
					name: '',
					description: '',
				};
			} else {
				let blankFildName;
				switch (blankField) {
					case 'link': blankFildName = 'Link'
						break
					case 'name': blankFildName = 'Имя'
						break
					case 'description': blankFildName = 'Title'
						break
				}
				this.$refs.modalText.innerHTML = `<span class="fst-italic">поле </span>
				<span class="fw-medium fst-normal">${blankFildName}</span>
				 <span class="text-danger">не заполнено!</span>`;
				this.$refs.modal.click();
			}
		},
		editLinkRecordFromGroup(id) {
			let obj = this.bookmarkArr.filter(e => e.id == this.selectedToEdit)[0];
			let link = obj.bookmarksList.filter(e => e.id == id)[0];
			this.editOldLinkRecord = { name: link.name, description: link.description, link: link.link };
			link.edit = true;
		},
		saveLinkRecordFromGroup(linkId) {
			let obj = this.bookmarkArr.filter(e => e.id == this.selectedToEdit)[0];
			let link = obj.bookmarksList.filter(e => e.id == linkId)[0];
			store.changeRecordData(this.selectedToEdit, linkId, { ...this.editOldLinkRecord });
			link.edit = false;
		},
		deleteLinkFromGroup() {
			store.deleteLinkFromGroup(this.selectedToEdit, this.selectedToDelete);
		},

		_checkText(str) {
			return str.trim().length > 0 ? true : false
		},
	},
	computed: {
		sorted() {
			this.bookmarkArr.sort((a, b) => a.section_order - b.section_order);
			console.log(this.bookmarkArr);
			return this.bookmarkArr
		},
		group_selected() {
			if (this.selectedToEdit == 'Выберите имя группы') {
				return false
			}
			return true
		},
		getSelectedGroupRecord() {
			if (this.selectedToEdit == 'Выберите имя группы') {
				return this.selectedToEdit
			} else {
				let selectedGroup = this.bookmarkArr.filter(e => e.id == this.selectedToEdit)[0];
				selectedGroup.bookmarksList.sort((a, b) => a.linkOrder - b.linkOrder);
				return selectedGroup.bookmarksList
			}
		},
	},
	created() {
		store = useBookmarkStore();
		this.bookmarkArr = store.bookmarkArr;
	}
}
</script>


<template>
	<PageHeader :msg="'Редактирование записей в группе'" />
	<PageHeader :msg="'(Из выпадающего списка выберите группу для редактирования)'" :num="6" :tagName="'P'" />

	<div class="row justify-content-center mb-4">

		<div class="mt-2">
			<div class="row justify-content-center">
				<div class="col-10 mb-2">
					<select class="form-select" aria-label="Default select example" v-model="selectedToEdit">
						<option>Выберите имя группы</option>
						<option v-for="elem in bookmarkArr" :value="elem.id" :key="elem.id">{{ elem.section_name }}
						</option>
					</select>
				</div>
			</div>
		</div>

		<div v-if="group_selected" class="mt-2">
			<div class="row justify-content-center">

				<ol class="list-group list-group-numbered col-12 col-md-10 col-md-10 col-lg-8 mb-4">
					<li v-for="(elem) in getSelectedGroupRecord" :key="elem.id" class="list-group-item d-flex">

						<div class="row w-100">
							<div class="col-12 d-flex align-items-center justify-content-between">


								<span>
									<button class="btn btn-primary p-1 m-1 lh-1" @click="changeOrder(elem.id, 'up')"
										:disabled="checkUp(elem.linkOrder)" title="Переместить группу вверх">
										<IconArrowUp />
									</button>
									<button class="btn btn-primary p-1 m-1 lh-1" @click="changeOrder(elem.id, 'down')"
										:disabled="checkDown(elem.linkOrder)" title="Переместить группу вниз">
										<IconArrowDown />
									</button>
								</span>
								<span class="f1">
									{{ elem.name }}
								</span>

								<button v-if="!elem.edit" class="btn btn-primary p-1 m-1 lh-1"
									@click="editLinkRecordFromGroup(elem.id)" title="Отредактировать запись">
									<EditText />
								</button>
								<button v-else class="btn btn-primary p-1 m-1 lh-1"
									@click="saveLinkRecordFromGroup(elem.id)" title="сохранить запись">
									<SaveText />
								</button>
							</div>
							<!-- <div v-if="elem.edit" class="col-12">

								<input type="text" class="form-control f1 my-1" v-model="editOldLinkRecord.link">
								<input type="text" class="form-control f1 my-1" v-model="editOldLinkRecord.name">
								<input type="text" class="form-control f1 my-1" v-model="editOldLinkRecord.description">
							</div> -->

							<div v-if="elem.edit" class="row g-1 justify-content-center">
								<div class="input-group mb-1 ">
									<div class="col-12 mb-2">
										<label for="inputLink" class="row g-1">
											<div class="col-3 col-sm-2 col-md-2">
												<span class="input-group-text" id="basic-addon1">Link</span>
											</div>
											<div class="col-9 col-sm-10 col-md-10">
												<input type="text" class="form-control" placeholder="Адрес ссылки"
													aria-label="Username" aria-describedby="basic-addon1" id="inputLink"
													v-model="editOldLinkRecord.link">
											</div>
										</label>
									</div>
									<div class="col-12  mb-2">
										<label class="row g-1" for="inputName">
											<div class="col-3 col-sm-2 col-md-2">
												<span class="input-group-text" id="basic-addon2">Имя</span>
											</div>
											<div class="col-9 col-sm-10 col-md-10">
												<input type="text" class="form-control"
													placeholder="Отображаемое название" aria-label="Username"
													aria-describedby="basic-addon2" id="inputName"
													v-model="editOldLinkRecord.name">
											</div>
										</label>
									</div>
									<div class="col-12 mb-2">
										<label class="row g-1" for="inputDescription">
											<div class="col-3 col-sm-2 col-md-2">
												<span class="input-group-text" id="basic-addon3">Title</span>
											</div>
											<div class="col-9 col-sm-10 col-md-10">
												<input type="text" class="form-control" placeholder="Описание"
													aria-label="Username" aria-describedby="basic-addon3"
													id="inputDescription" v-model="editOldLinkRecord.description">
											</div>
										</label>
									</div>

								</div>
							</div>



						</div>
					</li>
				</ol>

				<PageHeader :msg="'Добавить новую запись в группу'" />
				<PageHeader :msg="'(Заполните обязательные поля и нажмите &laquo;Добавить запись в группу&raquo;)'"
					:num="6" :tagName="'P'" />
				<div class="row g-1 justify-content-center">
					<div class="input-group mb-1 justify-content-center">
						<div class="col-12 col-sm-10 mb-2">
							<label for="inputLink" class="row g-1">
								<div class="col-3 col-sm-2 col-md-1">
									<span class="input-group-text" id="basic-addon1">Link</span>
								</div>
								<div class="col-9 col-sm-10 col-md-11">
									<input type="text" class="form-control" placeholder="Адрес ссылки"
										aria-label="Username" aria-describedby="basic-addon1" id="inputLink"
										v-model="editNewLinkRecord.link">
								</div>
							</label>
						</div>
						<div class="col-12 col-sm-10 mb-2">
							<label class="row g-1" for="inputName">
								<div class="col-3 col-sm-2 col-md-1">
									<span class="input-group-text" id="basic-addon2">Имя</span>
								</div>
								<div class="col-9 col-sm-10 col-md-11">
									<input type="text" class="form-control" placeholder="Отображаемое название"
										aria-label="Username" aria-describedby="basic-addon2" id="inputName"
										v-model="editNewLinkRecord.name">
								</div>
							</label>
						</div>
						<div class="col-12 col-sm-10 mb-2">
							<label class="row g-1" for="inputDescription">
								<div class="col-3 col-sm-2 col-md-1">
									<span class="input-group-text" id="basic-addon3">Title</span>
								</div>
								<div class="col-9 col-sm-10 col-md-11">
									<input type="text" class="form-control" placeholder="Описание" aria-label="Username"
										aria-describedby="basic-addon3" id="inputDescription"
										v-model="editNewLinkRecord.description">
								</div>
							</label>
						</div>

					</div>
					<div class="col-10 text-center mb-4">
						<button class="btn btn-success" @click="addNewLinkInGroup">Добавить ссылку в группу</button>
					</div>
				</div>

				<PageHeader :msg="'Удаление записи из группы'" />
				<PageHeader :msg="'(выберите запись	из выпадающего списка и нажмите &laquo;Удалить запись&raquo;)'"
					:num="6" :tagName="'P'" />
				<div class="mt-2">
					<div class="row justify-content-center">
						<div class="col-10 mb-2">
							<select class="form-select" aria-label="Default select" v-model="selectedToDelete">
								<option>Выберите имя записи</option>
								<option v-for="elem in getSelectedGroupRecord" :value="elem.id" :key="elem.id">{{
									elem.name
								}}</option>
							</select>
						</div>
						<button class="btn btn-danger col-10 col-sm-6 col-md-4 mb-2"
							@click="deleteLinkFromGroup">Удалить
							запись</button>
					</div>
				</div>

			</div>
		</div>
		<div v-else class="mt-2 text-center">Группа не выбрана, {{ getSelectedGroupRecord.toLowerCase() }}</div>
	</div>





	<!-- Модальное окно -->
	<!-- Button trigger modal -->
	<button type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#warningModal"
		ref="modal">
		Launch demo modal
	</button>
	<!-- Modal -->
	<div class="modal fade" id="warningModal" tabindex="-1" aria-labelledby="warningModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="warningModalLabel">Не все поля заполнены</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body" ref="modalText">
					...
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>




</template>

<style>
.f1 {
	flex: 1;
}
</style>
