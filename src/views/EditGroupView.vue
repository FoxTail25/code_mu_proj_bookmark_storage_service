<script setup>
import EditText from '@/components/icon/EditText.vue';
import IcinArrowDown from '@/components/icon/IconArrowDown.vue';
import IcinArrowUp from '@/components/icon/IconArrowUp.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useBookmarkStore } from '@/stores/bookmarks';

</script>
<script>
let store;

export default {
  data() {
    return {
      bookmarkArr: [],
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
      // console.log(elemId)
      // console.log(elemName)
      let elem = this.bookmarkArr.filter(e => e.id == elemId)
      console.log(elem)
    },

  },
  computed: {
    sorted() {
      this.bookmarkArr.sort((a, b) => a.section_order - b.section_order);
      return this.bookmarkArr.map(elem => { return { ...elem, edit: false } })
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

  <div class="row justify-content-center">

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
        <input v-else="!elem.edit" class="f1" :value="elem.section_name">


        <button class="btn btn-primary p-1 m-1 lh-1" @click="editGroupName(elem.id, elem.section_name)"
          title="Изменить название группы">
          <EditText />
        </button>
      </li>
    </ol>
  </div>
</template>

<style>
.f1 {
  flex: 1;
}
</style>
