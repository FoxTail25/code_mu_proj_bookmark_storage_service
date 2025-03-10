<script setup>
// import { nanoid } from 'nanoid';
import { RouterLink, RouterView } from 'vue-router'
import { useBookmarkStore } from './stores/bookmarks';
import PageHeader from './components/PageHeader.vue';

// console.log(nanoid())
const store = useBookmarkStore()
store.setFirstData()

</script>

<script>
export default {
  mounted() {
    // this.$refs.first.focus()
    // this.$refs.first.hover
  }
}
</script>


<template>

  <div class="container">

    <PageHeader :msg="'Сервис хранения закладок сайтов'" :num="2" />

    <ul class="nav nav-tabs justify-content-center mb-4">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link">Мои закладки</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/edit_group" class="nav-link">Редактирование групп</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/edit_record" class="nav-link">Редактирование записей</RouterLink>
      </li>
    </ul>

  </div>

  <RouterView />
</template>

<style scoped>
.otr {
  transform: scale(1, -1);
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
