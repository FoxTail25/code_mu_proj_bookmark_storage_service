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

  function setFirstData() {
    name.value = 'default'
    bookmarkArr.value = [...dafaultBookmarksArr]
  }
  function changeGroupOrder(id, direct) {
    let ind1;
    let ind2;
    if (direct == 'up') {
      bookmarkArr.value.forEach((elem, index) => {
        if (elem.id == id) {
          console.log('up', elem)
          ind1 = index;
          ind2 = index - 1;
        }
      })
    } else {
      bookmarkArr.value.forEach((elem,index) => {
        if (elem.id == id) {
          console.log('up', elem)
          ind1 = index;
          ind2 = index + 1;
        }
      })
    }
    console.log('ind1',ind1)
    console.log('ind2',ind2)
  }

  return {
    bookmarkArr,
    name,
    // sortedBookmarks,
    changeGroupOrder,
    setFirstData,
  }
})
