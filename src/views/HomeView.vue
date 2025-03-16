<script setup>
import PageHeader from '@/components/PageHeader.vue';
import { useBookmarkStore } from '@/stores/bookmarks';
import { getFavicon } from '@/util/getFavicon';

</script>

<script>
let store
export default {
  data() {
    return {
      bookmarks: [],
      searchString: '',
      searchingArr: [],
    }
  },
  computed: {
    getOrder() {
      this.bookmarks = [...store.bookmarkArr]
      return this.bookmarks
    },
    search() {
      let arr = this.bookmarks.reduce((acc, obj) => {
        let arrLinks = obj.bookmarksList;
        arrLinks.forEach(element => {
          acc.push(element);
        });
        return acc
      }, [])
      let searchStr = this.searchString.toLowerCase();
      this.searchingArr = arr.filter(el => {
        return ((el.link.toLowerCase()).includes(searchStr) || (el.name.toLowerCase()).includes(searchStr) || (el.description.toLowerCase()).includes(searchStr));
      })
      return ''
    },
    searchAnswerVisible() {
      return this.searchingArr.length > 0 && this.searchString != ""
        ? true
        : false
    },

  },
  methods: {
    getFav(path) {
      return getFavicon(path);
    },
    highlightedText(str) {
      let incomStrLowerCase = str.toLowerCase()
      let searchStr = this.searchString.toLowerCase()
      let newStr = str;
      if (incomStrLowerCase.includes(searchStr)) {
        newStr = incomStrLowerCase.replace(searchStr, `<span class="text-bg-success">${searchStr}</span>`);
      }
      return newStr
    },
    downLoadBookmarksData(){
     const data =  localStorage.getItem('bookmarksService');
    const blob = new Blob([`const youBookmrks = ${data}`], { type: 'text/JavaScript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'myBookmarks.js';
    document.body.appendChild(a);
    a.click();
    }
  },
  created() {
    store = useBookmarkStore();
  }
}
</script>

<template>

  <PageHeader :msg="'Закладки'" />

  <main class="container">


    <label for="searcher" class="form-label mb-0 text-center w-100"
      title="Поиск ведётся без учёта регистра! т.е. если вы ищете 'Аб' - то будут найдены 'Аб','АБ','аБ'и'аб'">Поиск по
      закладкам</label>
    <input type=" search" id="searcher" class="form-control mb-2" v-model="searchString" @input="search"
      placeholder="введите символы для поиска по записям"
      title="Поиск ведётся без учёта регистра! т.е. если вы ищете 'Аб' - то будут найдены 'Аб','АБ','аБ'и'аб'">
    <div v-if="searchAnswerVisible" class="row">
      <div class="col-12">

        <p>есть {{ searchingArr.length }} {{ searchingArr.length > 1 ? "записи" : "запись" }}</p>
        <table class="table mb-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ссылка</th>
              <th scope="col">Название</th>
              <th scope="col">Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(elem, ind) in searchingArr" :key="elem.id" class="mb-4">
              <th scope="row">{{ ind }}</th>
              <td><a :href="elem.link" target="_blank" v-html="highlightedText(elem.link)"></a></td>
              <td v-html="highlightedText(elem.name)"></td>
              <td v-html="highlightedText(elem.description)"></td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
    <div class="row g-2 mb-4">
      <div v-for="elem in getOrder" :key="elem.id" class="col-12 col-md-6">
        <div class="card">

          <div class="card-body">

            <h5 class="card-title"> {{ elem.section_name }}</h5>
            <p v-for="item in elem.bookmarksList" :key="item.id" class="card-text">

              <a :href="item.link" target="_blank" :title="item.description">
                <!-- <img :src="getFav(item.link)" alt="favicon" width="16px" height="16px" class="p-6"> -->
                {{ item.name }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <button class="btn btn-success col-10 col-sm-8 col-md-5 col-lg-4" @click="downLoadBookmarksData">Сохранить данные в js файле</button>
    </div>
  </main>
</template>
