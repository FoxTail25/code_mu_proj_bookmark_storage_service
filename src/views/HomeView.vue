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
      console.log(this.searchString);
      let arr = this.bookmarks.reduce((acc, obj) => {
        let arrLinks = obj.bookmarksList;
        arrLinks.forEach(element => {
          acc.push(element)
        });
        return acc
      }, [])
      // console.log(arr)
      this.searchingArr = arr.filter(el => (el.link.includes(this.searchString) || el.name.includes(this.searchString) || el.description.includes(this.searchString)))
      // console.log(this.searchingArr);
      return '';
    },
    searchAnswerVisible() {
      console.log(this.searchingArr.length)
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
        <div v-for="elem in searchingArr" key="elem.id" class="mb-4">
          <a :href="elem.link" target="_blank" :title="elem.description">
            <!-- <img :src="getFav(item.link)" alt="favicon" width="16px" height="16px" class="p-6"> -->
            {{ elem.name }}
          </a>
        </div>
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
