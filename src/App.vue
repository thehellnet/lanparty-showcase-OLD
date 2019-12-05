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
  public panes: Pane[] = [];

  public created() {
    showcaseService.onConnect(() => {
      statusService.websocketConnected = true;
    });

    showcaseService.onDisconnect(() => {
      statusService.websocketConnected = false;
    });

    showcaseService.onMessage(content => this.handleMessage(content));
  }

  private handleMessage(content: any) {
    if (content.hasOwnProperty("panes")) {
      const panes: Pane[] = [];

      for (const pane of content.panes) {
        const item: Pane = {
          id: pane.id,
          name: pane.name,
          mode: pane.mode
        };

        if (pane.tournament != null) {
          item.tournament = pane.tournament;
        }
        if (pane.match != null) {
          item.match = pane.match;
        }

        panes.push(item);
      }

      this.panes = panes;
    }
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

@import "~typeface-montserrat/index.css";

#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
