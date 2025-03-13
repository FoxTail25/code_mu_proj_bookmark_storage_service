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
    // console.log(id);
    let index;
    bookmarkArr.value.forEach((e, i) => {
      if (e.id == id) {
        index = i
      }
    })
    bookmarkArr.value.splice(index, 1)

  };


  function changeRecordOrder(groupId, recordId, direct) {
    let currentIndex;
    let replaceableIndex;
    if (direct == 'up') {
      (bookmarkArr.value.filter(e => e.id == groupId)[0]).bookmarksList.forEach((elem, index) => {
        if (elem.id == recordId) {
          currentIndex = index;
          replaceableIndex = index - 1;
        }
      })
    } else {
      (bookmarkArr.value.filter(e => e.id == groupId)[0]).bookmarksList.forEach((elem, index) => {
        if (elem.id == recordId) {
          currentIndex = index;
          replaceableIndex = index + 1;
        }
      })
    }
    bookmarkArr.value.filter(e => e.id == groupId)[0].bookmarksList[currentIndex].linkOrder = replaceableIndex;
    bookmarkArr.value.filter(e => e.id == groupId)[0].bookmarksList[replaceableIndex].linkOrder = currentIndex;
  };
  function changeRecordData(groupId, indexId, newData) {
    let { name: newName, link: newLink, description: newDescription } = { ...newData };
    console.log(newName, newLink, newDescription)
    bookmarkArr.value.forEach(e => {
      if (e.id == groupId) {
        e.bookmarksList.forEach(e => {
          if (e.id == indexId) {
            e.name = newName;
            e.link = newLink;
            e.description = newDescription;
          }
        })
      }
    })
  };
  function addNewLinkRecord(groupId, newRecordObjData) {
    let newLinkRecord = {
      ...newRecordObjData, id: nanoid(), linkOrder: bookmarkArr.value.filter(e => e.id == groupId)[0].bookmarksList.length, edit: false
    };
    bookmarkArr.value.filter(e => e.id == groupId)[0].bookmarksList.push(newLinkRecord)
  }
  function deleteLinkFromGroup(groupId, linkId) {
    // console.log('groupId', groupId);
    // console.log(bookmarkArr.value)
    let groupIndex;
    let linkIndex;
    bookmarkArr.value.forEach((e, i) => {
      if (e.id == groupId) {
        groupIndex = i;
      }
    })
    bookmarkArr.value[groupIndex].bookmarksList.forEach((e, i) => {
      if (e.id == linkId) {
        linkIndex = i
      }
    })
    bookmarkArr.value[groupIndex].bookmarksList.splice(linkIndex, 1);
  }

  return {
    bookmarkArr,
    name,
    setFirstData,
    changeGroupOrder,
    changeGroupName,
    addNewGroup,
    deleteBookmarkGroup,
    changeRecordOrder,
    addNewLinkRecord,
    deleteLinkFromGroup,
    changeRecordData,
  };
})
