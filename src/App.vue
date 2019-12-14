<template>
  <div id="app">
    <ShowcaseContent />
    <ShowcaseFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ShowcaseFooter from "@/components/ShowcaseFooter.vue";
import ShowcaseContent from "@/components/ShowcaseContent.vue";
import showcaseService from "@/services/showcase.service";
import statusService from "@/services/status.service";

@Component({
  components: { ShowcaseContent, ShowcaseFooter }
})
export default class App extends Vue {
  public created() {
    showcaseService.onConnect(() => {
      statusService.websocketConnected = true;
    });

    showcaseService.onDisconnect(() => {
      statusService.websocketConnected = false;
    });

    showcaseService.onMessage(content => this.handleMessage(content));
  }

  private handleMessage(content: any) {}
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background: black;
}

@import "~typeface-montserrat/index.css";

div#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: grid;
  color: #f8ffea;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
