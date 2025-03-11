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
    }
  },
  computed: {
    getOrder() {
      let sortedBookmarks = this.bookmarks.sort((a, b) => a.section_order - b.section_order);
      return sortedBookmarks
    }
  },
  methods: {
    getFav(path) {
      return getFavicon(path)
    }
  },
  mounted() {
    this.bookmarks = [...store.bookmarkArr];
    // store.sortedBookmarks
  },
  created() {
    store = useBookmarkStore()
  }
}
</script>

<template>

  <PageHeader :msg="'Закладки'" />

  <main class="container">

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
