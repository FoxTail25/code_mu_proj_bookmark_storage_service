import {
  ref,
  // computed
} from 'vue'
import { defineStore } from 'pinia'
import { dafaultBookmarksArr } from '@/util/defaultBookmarks'

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarkArr = ref([])
  const name = ref('none')
  // const sortedBookmarks = computed(() => bookmarkArr.value.sort((a, b) => a.section_order - b.section_order));
  // const sortedBookmarks = computed(() => console.log('store sorted', bookmarkArr.value));

  function setFirstData() {
    name.value = 'default'
    bookmarkArr.value = [...dafaultBookmarksArr]
  }
  function changeGroupOrder(id, direct) {
    let currentIndex;
    let replaceableIndex;
    if (direct == 'up') {
      bookmarkArr.value.forEach((elem, index) => {
        if (elem.id == id) {
          currentIndex = index;
          replaceableIndex = index - 1;
        }
      })
    } else {
      bookmarkArr.value.forEach((elem, index) => {
        if (elem.id == id) {
          currentIndex = index;
          replaceableIndex = index + 1;
        }
      })
    }
    bookmarkArr.value[currentIndex].section_order = replaceableIndex;
    bookmarkArr.value[replaceableIndex].section_order = currentIndex;
    // sortedBookmarks
    // console.log('currentIndex', currentIndex)
    // console.log('replaceableIndex', replaceableIndex)
  }

  return {
    bookmarkArr,
    name,
    // sortedBookmarks,
    changeGroupOrder,
    setFirstData,
  }
})
