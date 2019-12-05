<template>
  <div>
    <div id="content">
      <v-carousel v-model="panes"> </v-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import showcaseService from "@/services/showcase.service";

@Component({})
export default class App extends Vue {
  public txMessage: string = "";

  public panes: Pane[] = [];

  public created() {
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
