<script setup>
import IcinArrowDown from '@/components/IconArrowDown.vue';
import IcinArrowUp from '@/components/IconArrowUp.vue';
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

  },
  computed: {
    sorted() {
      return this.bookmarkArr.sort((a, b) => a.section_order - b.section_order)
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
  <ol>
    <li v-for="(elem) in sorted" :key="elem.id">
      <button class="btn btn-primary p-1 m-1 lh-1" @click="changeOrder(elem.id, 'up')"
        :disabled="checkUp(elem.section_order)">
        <IcinArrowUp />
      </button>
      <button class="btn btn-primary p-1 m-1 lh-1" @click="changeOrder(elem.id, 'down')"
        :disabled="checkDown(elem.section_order)">
        <IcinArrowDown />
      </button>
      {{ elem.section_name }}

    </li>
  </ol>
</template>

<style></style>
