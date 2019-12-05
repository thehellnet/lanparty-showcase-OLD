<template>
  <div id="content"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ShowcaseContent extends Vue {
  public clockText: string = "";
  created() {}
}
</script>

<style scoped>
div#content {
  flex: 1 0 auto;
  background: #222222;
}
</style>
