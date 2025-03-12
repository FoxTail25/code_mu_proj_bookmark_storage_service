<script>
export default {
  props: {
    msg: String,
    num: Number,
    tagName: String,
  },
  computed: {
    classN() {
      return this.num
        ? "text-center fs-" + this.num
        : "text-center fs-4"
    },
    tagN() {
      if(this.tagName == 'P') {
        return false
      } else {
        return true
      }
    },
  }

}
</script>

<template>
  <header  v-if="tagN">
    <h2 :class="classN">{{ msg }}</h2>
  </header>
  <p v-else :class="classN">{{22+  msg }}</p>
</template>
