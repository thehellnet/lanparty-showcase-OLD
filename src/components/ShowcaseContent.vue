<template>
  <div id="content">
    <div class="pane-title">
      League of Legends - 1v1
    </div>
    <div class="pane-content">
      <div id="match-table" class="match-table">
        <div
          v-for="(match, idx) in matches"
          :key="idx"
          :id="'match-' + match.id"
          class="match-row"
        >
          <div
            v-bind:class="{
              'match-cell-local': true,
              'player-winner':
                match.status === 'PLAYED' && match.winner === 'local',
              'player-looser':
                match.status === 'PLAYED' && match.winner !== 'local'
            }"
          >
            {{ match.local }}
          </div>
          <div class="match-cell-info" v-if="match.status === 'PLAYED'">
            Terminiata
          </div>
          <div class="match-cell-info" v-if="match.status === 'RUNNING'">
            In corso
          </div>
          <div class="match-cell-info" v-if="match.status === 'SCHEDULED'">
            inizia alle {{ match.when }}
          </div>
          <div
            v-bind:class="{
              'match-cell-guest': true,
              'player-winner':
                match.status === 'PLAYED' && match.winner === 'guest',
              'player-looser':
                match.status === 'PLAYED' && match.winner !== 'guest'
            }"
          >
            {{ match.guest }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueScrollTo from "vue-scrollto";
import { DemoData } from "@/demo/demodata";

@Component
export default class ShowcaseContent extends Vue {
  public matches = DemoData.matches;

  mounted() {
    const runningMatch = this.matches.filter(
      match => match.status === "RUNNING"
    )[0];

    VueScrollTo.scrollTo("#match-" + runningMatch.id, {
      container: "div.pane-content",
      duration: 3000,
      offset: -80
    });
  }
}
</script>

<style scoped>
div#content {
  margin: 0;
  padding: 0;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #222222;
  font-size: x-large;
}

div.pane-title {
  margin: 0;
  padding-top: 10px;
  padding-bottom: 20px;
  position: absolute;
  width: 100%;
  top: 0;
  height: 100px;
  font-size: 3.5em;
  font-weight: bold;
}

div.pane-content {
  margin: 0;
  padding: 0;
  position: absolute;
  overflow-y: auto;
  width: 100%;
  top: 130px;
  bottom: 50px;
  font-size: 1.5em;
}

div.match-table {
  margin: 0;
  padding: 0;
}

div.match-row {
  margin: 0;
  padding: 0 150px;
  height: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

div.match-row div {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

div.match-row:nth-child(odd) {
  background: rgba(255, 255, 255, 0.05);
}

div.match-row:nth-child(even) {
  background: rgba(255, 255, 255, 0.015);
}

div.match-cell-local {
  flex: 0 0 20%;
}

div.match-cell-guest {
  flex: 0 0 20%;
}

div.match-cell-info {
  flex: auto;
  font-size: 0.75em;
  display: flex;
  flex-direction: row;
}

.player-winner {
  color: #0c9a9a;
}

.player-looser {
  color: dimgrey;
}
</style>
