import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { dafaultBookmarksArr } from '@/util/defaultBookmarks'

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarkArr = ref([])
  const name = ref('none')
  const firstElem = computed(() => bookmarkArr.value[0])
  
  function setFirstData() {
    name.value = 'default';
    bookmarkArr.value = [...dafaultBookmarksArr];
  }

  return { bookmarkArr, name, firstElem, setFirstData }
})
