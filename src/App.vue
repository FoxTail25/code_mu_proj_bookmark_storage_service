<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useBookmarkStore } from './stores/bookmarks';
import PageHeader from './components/PageHeader.vue';

const store = useBookmarkStore();
store.setFirstData();
</script>

<template>
  <div class="container mh-100">

    <PageHeader :msg="'Сервис хранения закладок сайтов'" :num="2" />

    <ul class="nav nav-tabs justify-content-center mb-4">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link">Мои закладки</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/edit_group" class="nav-link">Редактирование групп
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/edit_record" class="nav-link">Редактирование записей
        </RouterLink>
      </li>
    </ul>
    <!-- <p><strong>Текущий путь маршрута:</strong> {{ $route.fullPath }}</p> -->

    <RouterView />
  </div>

  <footer>
    <div class="container">
      <div class="footer">
        <div class="copyright">©</div>
        <div class="author">
          <a href="https://github.com/FoxTail25" target="_blank" class="author_git"></a>
          <span>FoxTail25</span>
          <a href="https://t.me/Siverk" target="_blank" class="author_telegram"></a>
        </div>
        <div class="year">2025</div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  height: 30px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgba(236, 236, 236, .3);
  display: flex;
  align-items: center;
}

.mh-100 {
  min-height: calc(100vh - 30px);
}
</style>
