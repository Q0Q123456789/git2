<template>
  <div>
      <h1>123113213</h1>
      <h2></h2>
      <v-news >新闻</v-news>
  </div>
</template>
<script>
import News from "./News.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    "v-news": News
  },
  modules() {},
  mounted() {}
};
</script>
<style scoped>

</style>
