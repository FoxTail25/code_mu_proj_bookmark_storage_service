import {
  ref,
  // computed
} from 'vue'
import { defineStore } from 'pinia'
import { defaultBookmarksArr } from '@/util/defaultBookmarks'
import { nanoid } from 'nanoid';
import { localStorageWork } from '@/util/local_stor';

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarkArr = ref([]);
  const name = ref('none');
  const deletedBookmarksArr = ref([]);
  const deletedLinkArr = ref([]);


  function setFirstData() {
    let localArr = localStorageWork.getRecord();
    if (!localArr) {
      name.value = 'default';
      bookmarkArr.value = [...defaultBookmarksArr];
      localStorageWork.setRecord([...defaultBookmarksArr]);
    } else {
      name.value = 'local';
      bookmarkArr.value = [...localStorageWork.getRecord()];
    }
  };


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
    bookmarkArr.value.sort((a, b) => a.section_order - b.section_order);

    localStorageWork.setRecord([...bookmarkArr.value]);
  };
  function changeGroupName(id, name) {
    bookmarkArr.value.forEach(e => {
      if (e.id == id) {
        e.section_name = name;
      }
    })
    localStorageWork.setRecord([...bookmarkArr.value]);
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
    localStorageWork.setRecord([...bookmarkArr.value]);
  };
  function deleteBookmarkGroup(id) {
    let index;
    bookmarkArr.value.forEach((e, i) => {
      if (e.id == id) {
        index = i;
      }
    })
    let deletedGroupItem = bookmarkArr.value.splice(index, 1)[0];
    deletedBookmarksArr.value.push({ ...deletedGroupItem });
    bookmarkArr.value.forEach((e, i) => e.section_order = i);
    localStorageWork.setRecord([...bookmarkArr.value]);
  };
  function permanentRemovalGroup(id) {
    let indexDelItem;
    deletedBookmarksArr.value.forEach((e, i) => {
      if (e.id == id) {
        indexDelItem = i
      }
    })
    deletedBookmarksArr.value.splice(indexDelItem, 1)
  };
  function restoreDeletedGroup(group, id) {
    this.permanentRemovalGroup(id);
    group.section_order = bookmarkArr.value.length;
    bookmarkArr.value.push(group)
  }


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
    bookmarkArr.value.filter(e => e.id == groupId)[0].bookmarksList.sort((a, b) => a.linkOrder - b.linkOrder)

    localStorageWork.setRecord([...bookmarkArr.value]);
  };
  function changeRecordData(groupId, indexId, newData) {
    let { name: newName, link: newLink, description: newDescription } = { ...newData };
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
    localStorageWork.setRecord([...bookmarkArr.value]);
  };
  function addNewLinkRecord(groupId, newRecordObjData) {
    let newLinkRecord = {
      ...newRecordObjData, id: nanoid(), linkOrder: bookmarkArr.value.filter(e => e.id == groupId)[0].bookmarksList.length, edit: false
    };
    bookmarkArr.value.filter(e => e.id == groupId)[0].bookmarksList.push(newLinkRecord);
    localStorageWork.setRecord([...bookmarkArr.value]);
  };
  function deleteLinkFromGroup(groupId, linkId) {
    // console.log('group', groupId);
    // console.log('link', linkId);
    let groupIndex;
    let linkIndex;
    bookmarkArr.value.forEach((e, i) => {
      if (e.id == groupId) {
        groupIndex = i;
      }
    })
    bookmarkArr.value[groupIndex].bookmarksList.forEach((e, i) => {
      if (e.id == linkId) {
        linkIndex = i;
      }
    })

    let deletedLink = bookmarkArr.value[groupIndex].bookmarksList.splice(linkIndex, 1)[0];
    deletedLinkArr.value.push(deletedLink);
    bookmarkArr.value[groupIndex].bookmarksList.forEach((elem, ind) => elem.linkOrder = ind);
    localStorageWork.setRecord([...bookmarkArr.value]);
  };
  function permanentRemovalLink(linkId) {
    console.log(linkId)
    let indexDelItem;
    deletedLinkArr.value.forEach((e, i) => {
      if (e.id == linkId) {
        indexDelItem = i
      }
    })
    deletedLinkArr.value.splice(indexDelItem, 1);
    console.log(deletedLinkArr.value)
  }
  function restoreDeletedLinkInSelectedGroup(groupId, linkId) {

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

    deletedBookmarksArr,
    permanentRemovalGroup,
    restoreDeletedGroup,
    deletedLinkArr,
    permanentRemovalLink,
  };
})
