import {
  ref,
  // computed
} from 'vue'
import { defineStore } from 'pinia'
import { dafaultBookmarksArr } from '@/util/defaultBookmarks'
import { nanoid } from 'nanoid';

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarkArr = ref([]);
  const name = ref('none');
  // const sortedBookmarks = computed(() => bookmarkArr.value.sort((a, b) => a.section_order - b.section_order));
  // const sortedBookmarks = computed(() => console.log('store sorted', bookmarkArr.value));

  function setFirstData() {
    name.value = 'default'
    bookmarkArr.value = [...dafaultBookmarksArr]
  };
  function changeGroupOrder(id, direct) {
    console.log(id, direct)
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

  };
  function changeGroupName(id, name) {
    bookmarkArr.value.forEach(e => {
      if (e.id == id) {
        e.section_name = name;
      }
    })
  }
  function addNewGroup(newGroupName) {
    let orderNumber = bookmarkArr.value.length;
    let id = nanoid();
    bookmarkArr.value.push({
      id: id,
      section_order: orderNumber,
      section_name: newGroupName,
      edit: false,
      bookmarksList: []
    });
  };
  function deleteBookmarkGroup(id) {
    console.log(id);
    // console.log('befor', bookmarkArr.value)
    // bookmarkArr.value = bookmarkArr.value.filter(e => e.id != id)
    // // bookmarkArr.value = []
    // console.log('after', bookmarkArr.value)

  };

  return {
    bookmarkArr,
    name,
    setFirstData,
    changeGroupOrder,
    changeGroupName,
    addNewGroup,
    deleteBookmarkGroup,
  };
})
