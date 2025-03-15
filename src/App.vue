<script setup>
// import { RouterLink, RouterView } from 'vue-router';
import { useBookmarkStore } from './stores/bookmarks';
import PageHeader from './components/PageHeader.vue';
import ProjInfo from './components/ProjInfo.vue';
import Question from './components/icon/Question.vue';
import HomeView from './views/HomeView.vue';
import EditGroupView from './views/EditGroupView.vue';
import EditRecordView from './views/EditRecordView.vue';
import { ref } from 'vue';

const store = useBookmarkStore();
store.setFirstData();
</script>

<script>
export default {
  methods: {
    changeActivTab(name) {
      let refObj = { ...this.$refs }
      if (![...refObj[name].classList].includes('active')) {
        for (let ref in refObj) {
          if (name == ref) {
            if (![...refObj[ref].classList].includes('active')) {
              refObj[ref].classList.add('active')
            }
          } else {
            if ([...refObj[ref].classList].includes('active')) {
              refObj[ref].classList.remove('active')
            }
          }
        };
      }
    }
  }
}
</script>

<template>
  <div class="container mh-100">

    <PageHeader :msg="'Сервис хранения закладок сайтов'" :num="2" />
    <!-- Старая рабочая версия (Vue-router) -->
    <!--
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
    <RouterView />
     -->

    <ul class="nav nav-tabs justify-content-center mb-4">

      <li class="nav-item">
        <button type="button" data-bs-target="#caruselChange" data-bs-slide-to="0" class="nav-link active "
          aria-current="true" aria-label="Slide 1" @click="changeActivTab('myBookmark')" ref="myBookmark">Мои
          закладки</button>
      </li>
      <li class="nav-item">
        <button type="button" data-bs-target="#caruselChange" data-bs-slide-to="1" aria-label="Slide 2" class="nav-link"
          @click="changeActivTab('editGroup')" ref="editGroup">Редактирование групп</button>
      </li>
      <li class="nav-item">
        <button type="button" data-bs-target="#caruselChange" data-bs-slide-to="2" aria-label="Slide 3" class="nav-link"
          @click="changeActivTab('editLink')" ref="editLink">Редактирование записей</button>
      </li>
    </ul>


    <div id="caruselChange" class="carousel slide mb-4">

      <div class="carousel-inner">
        <div class="carousel-item transit active">
          <HomeView />
        </div>
        <div class="carousel-item transit">
          <EditGroupView />
        </div>
        <div class="carousel-item transit">
          <EditRecordView />
        </div>
      </div>
    </div>

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


  <!-- Button trigger modal -->
  <button type="button" class="question" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    <Question />
  </button>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-3" id="staticBackdropLabel">Проект "Сервис хранения закладок сайтов"</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ProjInfo />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.transit {
  transition: transform .2s ease
}

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

.question {
  position: absolute;
  right: 5px;
  top: 5px;
  background: none;
  border: none;

  @media screen and (min-width: 768px) {
    top: 20px;
    right: 10vw;
  }
}
</style>
