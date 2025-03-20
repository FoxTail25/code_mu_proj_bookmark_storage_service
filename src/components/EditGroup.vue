<script setup>
import EditText from '@/components/icon/EditText.vue';
import IcinArrowDown from '@/components/icon/IconArrowDown.vue';
import IcinArrowUp from '@/components/icon/IconArrowUp.vue';
import SaveText from '@/components/icon/SaveText.vue';
import Trash from '@/components/icon/Trash.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useBookmarkStore } from '@/stores/bookmarks';
// import Undo from './icon/Undo.vue';
import ListDeletedItem from './ListDeletedItem.vue';

</script>
<script>
let store;

export default {
  data() {
    return {
      bookmarkArr: [],
      nameText: '',
      newGroupName: '',
      deletedItem: [],
      isDeleted: false,
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
      let newName = this._checkText(this.nameText);
      store.changeGroupName(elemId, newName);
      this.nameText = '';
    },
    addNewGroup() {
      let newName = this._checkText(this.newGroupName);
      store.addNewGroup(newName);
      this.newGroupName = '';
    },
    deleteGroup(id) {
      // console.log(id)
      store.deleteBookmarkGroup(id);
    },
    restoreGroup(id) {
      console.log('restore group id:', id);
      let daletedGroup = this.deletedItem.filter(e => e.id == id)[0];

      store.restoreDeletedGroup(daletedGroup, id);
    },
    permanentRemoval(id) {
      store.permanentRemovalGroup(id)
    },
    _checkText(str) {
      return str.trim().length > 0 ? str : 'безымянная'
    },
  },
  computed: {
    sorted() {
      this.bookmarkArr.sort((a, b) => a.section_order - b.section_order);
      return this.bookmarkArr
    },
    reNewDeletedGroupArr() {
      this.deletedItem = store.deletedBookmarksArr;

      if (this.deletedItem.length != 0) {
        this.isDeleted = true
      } else {
        this.isDeleted = false
      }
      return this.deletedItem;
    },
  },

  created() {
    store = useBookmarkStore();
    this.bookmarkArr = store.bookmarkArr;
  },

}
</script>

<template>
  <PageHeader :msg="'Редактирование групп записей'" />
  <PageHeader :msg="'(изменение имени и порядка отображения)'" :num="6" :tagName="'P'" />
  <!-- Изменение порядка и имени -->
  <div class="row justify-content-center mb-4">

    <TransitionGroup name="list" tag="ol"
      class="list-group list-group-numbered col-11 col-md-10 col-md-10 col-lg-8 px-0">
      <li v-for="(elem) in sorted" :key="elem.id"
        class="list-group-item d-flex align-items-center justify-content-between px-0 px-sm-2 py-1">

        <span>
          <button class="btn btn-primary p-1 m-0 ms-1 lh-1" @click="changeOrder(elem.id, 'up')"
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


        <button v-if="!elem.edit" class="btn btn-primary p-1 mx-0 mx-md-1 lh-1"
          @click="editGroupName(elem.id, elem.section_name)" title="Изменить название группы">
          <EditText />
        </button>
        <button v-else class="btn btn-primary p-1 mx-0 lh-1" @click="saveGroupName(elem.id)"
          title="Сохранить название группы">
          <SaveText />
        </button>
        <button class="btn btn-danger p-1 m-1 lh-1" title="удаление группы" @click="deleteGroup(elem.id)">
          <Trash />
        </button>
      </li>
    </TransitionGroup>

    <div v-if="isDeleted" class="row justify-content-center mt-4">
      <PageHeader :msg="'удалённые записи'" :num="5" :tagName="'P'" class="mb-0" />
      <p class="text-center">(записи будут автоматически удалены после обновления страницы)</p>
    </div>

    <ListDeletedItem :dataList="reNewDeletedGroupArr" :type="'group'" @restore="restoreGroup"
      @permanentDelete="permanentRemoval" />

  </div>
  <!-- Добавление новой группы -->
  <PageHeader :msg="'Добавление новой группы'" />
  <PageHeader :msg="'(напишите имя и нажмите 	&laquo;Добавить новую группу&raquo;)'" :num="6" :tagName="'P'" />
  <div class="mt-2 mb-2">
    <div class="row justify-content-center">
      <div class="col-10 mb-2">
        <input type="text" class="form-control" v-model="newGroupName">
      </div>
      <button class="btn btn-success col-10 col-sm-6 col-md-4" @click="addNewGroup">Добавить новую группу</button>
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
