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
			warningModalCloseLink: '',
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
				if (record == 'link') {
					if (!this._checkLink(this.editNewLinkRecord[record])) {
						blankField = record;
						break
					}
				} else {
					if (!this._checkText(this.editNewLinkRecord[record])) {
						blankField = record;
						break
					}
				}
			}
			if (!blankField) {
				store.addNewLinkRecord(this.selectedToEdit, this.editNewLinkRecord);
				this.editNewLinkRecord = {
					link: '',
					name: '',
					description: '',
				};
			} else {
				let errorMessage;
				switch (blankField) {
					case 'link': errorMessage = `<span class="fst-italic">поле</span>
				<span class="fw-medium fst-normal">Link</span>
				 <span class="text-danger">Должно начинаться с <span class="fw-medium fst-normal">http://</span> или с <span class="fw-medium fst-normal">https://</span></span>`;
						this.warningModalCloseLink = 'link';
						break
					case 'name': errorMessage = `<span class="fst-italic">поле </span>
				<span class="fw-medium fst-normal">Имя</span>
				 <span class="text-danger">не заполнено!</span>`;
						this.warningModalCloseLink = 'name';
						break
					case 'description': errorMessage = `<span class="fst-italic">поле </span>
				<span class="fw-medium fst-normal">Title</span>
				 <span class="text-danger">не заполнено!</span>`;
						this.warningModalCloseLink = 'description';
						break
				}
				this.$refs.modalText.innerHTML = errorMessage;
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
			if (this.selectedToDelete != 'Выберите имя записи') {
				store.deleteLinkFromGroup(this.selectedToEdit, this.selectedToDelete);
				this.selectedToDelete = 'Выберите имя записи';
			} else {
				console.log('не выбрана запись') // надо прикрутить модалку вместо этого
				this.$refs.modalText.innerHTML = 'Не выбрана запись для удаления';
				this.warningModalCloseLink = 'deleteLink'
				this.$refs.modal.click();
			}
		},

		_checkText(str) {
			return str.trim().length > 0 ? true : false
		},
		_checkLink(str) {
			let answer = /^https:\/\/|^http:\/\//.test(str);
			return answer
		},
		warningModalClose() {
			switch (this.warningModalCloseLink) {
				case 'link': this.$refs.link.focus(); break
				case 'name': this.$refs.name.focus(); break
				case 'description': this.$refs.description.focus(); break
				case 'deleteLink': this.$refs.deleteLink.focus(); break
			}
		}
	},
	computed: {
		sorted() {
			this.bookmarkArr.sort((a, b) => a.section_order - b.section_order);
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

	<div class="row justify-content-center">

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

				<TransitionGroup name="list" tag="ol"
					class="list-group list-group-numbered col-11 col-md-10 col-lg-8 mb-4 px-0">
					<li v-for="(elem) in getSelectedGroupRecord" :key="elem.id"
						class="list-group-item d-flex px-1 px-sm-2">

						<div class="row w-100">
							<div class="col-12 d-flex align-items-center justify-content-between pe-0 ps-sm-3">

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

							<div v-if="elem.edit" class="row g-1 justify-content-center">
								<div class="input-group mb-1">
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
				</TransitionGroup>

				<PageHeader :msg="'Добавить новую запись в группу'" />
				<PageHeader :msg="'(Заполните обязательные поля и нажмите &laquo;Добавить запись в группу&raquo;)'"
					:num="6" :tagName="'P'" />
				<div class="row g-1 justify-content-center">
					<div class="input-group mb-0 justify-content-center">
						<div class="col-11 col-sm-10 mb-2">
							<label for="inputLink" class="row g-1">
								<div class="col-3 col-sm-2 col-md-1">
									<span class="input-group-text" id="basic-addon1">Link</span>
								</div>
								<div class="col-9 col-sm-10 col-md-11">
									<input type="text" class="form-control" placeholder="Адрес ссылки"
										aria-label="Username" aria-describedby="basic-addon1" id="inputLink"
										v-model="editNewLinkRecord.link" ref="link">
								</div>
							</label>
						</div>
						<div class="col-11 col-sm-10 mb-2">
							<label class="row g-1" for="inputName">
								<div class="col-3 col-sm-2 col-md-1">
									<span class="input-group-text" id="basic-addon2">Имя</span>
								</div>
								<div class="col-9 col-sm-10 col-md-11">
									<input type="text" class="form-control" placeholder="Отображаемое название"
										aria-label="Username" aria-describedby="basic-addon2" id="inputName"
										v-model="editNewLinkRecord.name" ref="name">
								</div>
							</label>
						</div>
						<div class="col-11 col-sm-10 mb-2">
							<label class="row g-1" for="inputDescription">
								<div class="col-3 col-sm-2 col-md-1">
									<span class="input-group-text" id="basic-addon3">Title</span>
								</div>
								<div class="col-9 col-sm-10 col-md-11">
									<input type="text" class="form-control" placeholder="Описание" aria-label="Username"
										aria-describedby="basic-addon3" id="inputDescription"
										v-model="editNewLinkRecord.description" ref="description">
								</div>
							</label>
						</div>

					</div>
					<div class="col-10 text-center mb-4 my-0">
						<button class="btn btn-success" @click="addNewLinkInGroup">Добавить ссылку в группу</button>
					</div>
				</div>

				<PageHeader :msg="'Удаление записи из группы'" />
				<PageHeader :msg="'(выберите запись	из выпадающего списка и нажмите &laquo;Удалить запись&raquo;)'"
					:num="6" :tagName="'P'" />
				<div class="mt-2">
					<div class="row justify-content-center">
						<div class="col-10 mb-2">
							<select class="form-select" aria-label="Default select" v-model="selectedToDelete"
								ref="deleteLink">
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
	<div class="modal fade" id="warningModal" tabindex="-1" aria-labelledby="warningModalLabel" aria-hidden="true"
		@click="warningModalClose">
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
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Исправить</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.f1 {
	flex: 1;
}

.list-move,
/* применять переход к движущимся элементам */
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* убедитесь, что удаляющиеся элементы выведены из потока, чтобы
анимации перемещения могли быть рассчитаны правильно. */
.list-leave-active {
	position: static;
}
</style>
