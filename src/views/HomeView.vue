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
      let sortedBookmarks = this.bookmarks.sort((a, b) => a.section_order - b.section_order);
      return sortedBookmarks
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
      // console.log(this.searchingArr.length)
      return this.searchingArr.length > 0 && this.searchString != ""
        ? true
        : false
    }
  },
  methods: {
    getFav(path) {
      return getFavicon(path);
    }
  },
  mounted() {
    this.bookmarks = [...store.bookmarkArr];
  },
  created() {
    store = useBookmarkStore();
  }
}
</script>

<template>

  <PageHeader :msg="'Закладки'" />

  <main class="container">


    <label for="searcher" class="form-label">Поиск по закладкам</label>
    <input type="search" id="searcher" class="form-control mb-1" v-model="searchString" @input="search">
    <div v-if="searchAnswerVisible" class="row">
      <div class="col-12">

        <p>есть {{ searchingArr.length }} {{ searchingArr.length > 1 ? "записи" : "запись" }}</p>
        <table class="table">
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
              <td><a :href="elem.link">{{ elem.link }}</a></td>
              <td>{{ elem.name }}</td>
              <td>{{ elem.description }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
    <div class="row g-2">
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

  </main>

</template>
