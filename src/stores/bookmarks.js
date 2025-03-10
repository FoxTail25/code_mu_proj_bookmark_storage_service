import { ref,
  // computed
} from 'vue'
import { defineStore } from 'pinia'
import { dafaultBookmarksArr } from '@/util/defaultBookmarks'

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarkArr = ref([]);
  const name = ref('none');
  // const sortedBookmarks = computed(() => bookmarkArr.value.sort((a, b) => a.section_order - b.section_order));

  function setFirstData() {
    name.value = 'default';
    bookmarkArr.value = [...dafaultBookmarksArr];
  }

  return { bookmarkArr, name,
    // sortedBookmarks,
    setFirstData }
})
