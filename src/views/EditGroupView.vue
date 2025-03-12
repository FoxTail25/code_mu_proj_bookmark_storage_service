<script setup>
import EditText from '@/components/icon/EditText.vue';
import IcinArrowDown from '@/components/icon/IconArrowDown.vue';
import IcinArrowUp from '@/components/icon/IconArrowUp.vue';
import SaveText from '@/components/icon/SaveText.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useBookmarkStore } from '@/stores/bookmarks';

</script>
<script>
let store;

export default {
  data() {
    return {
      bookmarkArr: [],
      nameText: '',
      newGroupName: '',
      selectedToDelete: 'Выберите имя группы',
    }
  },
  methods: {
    changeOrder(id, direct) {
      store.changeGroupOrder(id, direct);
    },
    checkUp(num) {
      return num == 0
        ? true
        : false
    },
    checkDown(num) {
      return num == this.bookmarkArr.length - 1
        ? true
        : false
    },
    editGroupName(elemId, elemName) {
      this.bookmarkArr.forEach(e => {
        if (e.id == elemId) {
          e.edit = true;
        }
      })
      this.nameText = elemName;
    },
    saveGroupName(elemId) {
      this.bookmarkArr.forEach(e => {
        if (e.id == elemId) {
          e.edit = false;
        }
      })
      let newName = this._checkText(this.nameText)
      store.changeGroupName(elemId, newName)
      this.nameText = '';
    },
    addNewGroup() {
      let newName = this._checkText(this.newGroupName)
      store.addNewGroup(newName)
      this.newGroupName = ''
    },
    deleteGroup() {
      if (this.selectedToDelete != 'Выберите имя группы') {
        store.deleteBookmarkGroup(this.selectedToDelete)
      } else {
        console.log('Не выбрана группа')
        // this.showModal()
      }
    },

    _checkText(str) {
      return str.trim().length > 0 ? str : 'безымянная'
    },

    // showModal() {
    //   console.log('da')
    // },
  },
  computed: {
    sorted() {
      this.bookmarkArr.sort((a, b) => a.section_order - b.section_order);
      // console.log('computed', this.bookmarkArr)
      return this.bookmarkArr
    }
  },

  created() {
    store = useBookmarkStore();
    this.bookmarkArr = store.bookmarkArr
  }
}
</script>

<template>
  <PageHeader :msg="'Редактирование групп записей'" />
  <PageHeader :msg="'(изменение имени и порядка отображения)'" :num="6" :tagName="'P'" />
  <!-- Изменение порядка и имени -->
  <!-- <div class="container"> -->

  <div class="row justify-content-center mb-4">

    <ol class="list-group list-group-numbered col-12 col-md-10 col-md-10 col-lg-8">
      <li v-for="(elem) in sorted" :key="elem.id"
        class="list-group-item d-flex align-items-center justify-content-between">

        <span>
          <button class="btn btn-primary p-1 m-1 lh-1" @click="changeOrder(elem.id, 'up')"
            :disabled="checkUp(elem.section_order)" title="Переместить группу вверх">
            <IcinArrowUp />
          </button>
          <button class="btn btn-primary p-1 m-1 lh-1" @click="changeOrder(elem.id, 'down')"
            :disabled="checkDown(elem.section_order)" title="Переместить группу вниз">
            <IcinArrowDown />
          </button>
        </span>

        <span v-if="!elem.edit" class="f1">
          {{ elem.section_name }}
        </span>
        <input v-else type="text" class="form-control f1" v-model="nameText">


        <button v-if="!elem.edit" class="btn btn-primary p-1 m-1 lh-1"
          @click="editGroupName(elem.id, elem.section_name)" title="Изменить название группы">
          <EditText />
        </button>
        <button v-else class="btn btn-primary p-1 m-1 lh-1" @click="saveGroupName(elem.id)"
          title="сохранить название группы">
          <SaveText />
        </button>
      </li>
    </ol>
  </div>
  <!-- Добавление новой группы -->
  <PageHeader :msg="'Добавление новой группы'" />
  <PageHeader :msg="'(напишите имя и нажмите 	&laquo;Добавить новую группу&raquo;)'" :num="6" :tagName="'P'" />
  <div class="mt-2 mb-4">
    <div class="row justify-content-center">
      <div class="col-10 mb-2">
        <input type="text" class="form-control" v-model="newGroupName">
      </div>
      <button class="btn btn-success col-10 col-sm-6 col-md-4" @click="addNewGroup">Добавить новую группу</button>
    </div>
  </div>
  <!-- Удаление группы -->
  <PageHeader :msg="'Удаление группы'" />
  <PageHeader :msg="'(выберите группу	из выпадающего списка и нажмите &laquo;Удалить группу&raquo;)'" :num="6"
    :tagName="'P'" />
  <div class="mt-2">
    <div class="row justify-content-center">
      <div class="col-10 mb-2">
        <select class="form-select" aria-label="Default select" v-model="selectedToDelete">
          <option>Выберите имя группы</option>
          <option v-for="elem in sorted" :value="elem.id" :key="elem.id">{{ elem.section_name }}</option>
        </select>
      </div>
      <button class="btn btn-danger col-10 col-sm-6 col-md-4 mb-2" @click="deleteGroup">Удалить группу</button>
    </div>
  </div>
  <!-- </div> -->

</template>

<style>
.f1 {
  flex: 1;
}
</style>
