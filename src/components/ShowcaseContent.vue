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
            <div
              v-bind:class="{
                'player-winner':
                  match.status === 'PLAYED' && match.winner === 'local',
                'player-looser':
                  match.status === 'PLAYED' && match.winner !== 'local'
              }"
            >
              <div>
                <font-awesome-icon class="game-icon" icon="skull" />
                {{ match.scoresLocal.kills }}
              </div>
              <div>
                <font-awesome-icon class="game-icon" icon="coins" />
                {{ match.scoresLocal.gold }}
              </div>
              <div>
                <font-awesome-icon class="game-icon" icon="gopuram" />
                {{ match.scoresLocal.towers }}
              </div>
              <div>
                <font-awesome-icon class="game-icon" icon="dragon" />
                {{ match.scoresLocal.dragons }}
              </div>
            </div>
            <div
              v-bind:class="{
                'player-winner':
                  match.status === 'PLAYED' && match.winner === 'guest',
                'player-looser':
                  match.status === 'PLAYED' && match.winner !== 'guest'
              }"
            >
              <div>
                <font-awesome-icon class="game-icon" icon="skull" />
                {{ match.scoresGuest.kills }}
              </div>
              <div>
                <font-awesome-icon class="game-icon" icon="coins" />
                {{ match.scoresGuest.gold }}
              </div>
              <div>
                <font-awesome-icon class="game-icon" icon="gopuram" />
                {{ match.scoresGuest.towers }}
              </div>
              <div>
                <font-awesome-icon class="game-icon" icon="dragon" />
                {{ match.scoresGuest.dragons }}
              </div>
            </div>
          </div>
          <div class="match-cell-info" v-if="match.status === 'RUNNING'">
            In corso
          </div>
          <div class="match-cell-info" v-if="match.status === 'SCHEDULED'">
            inizia alle {{ match.when }}
          </div>
          <div
            v-bind:class="{
              'match-cell-local': true,
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

  created() {
    const runningMatch = this.matches.filter(
      match => match.status === "RUNNING"
    )[0];

    VueScrollTo.scrollTo("#match-" + runningMatch.id);
  }
}
</script>

<style scoped>
div#content {
  margin: 0;
  padding: 0;
  width: 100%;
  background: #222222;
  font-size: x-large;
}

div.pane-title {
  font-size: 3.5em;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 50px;
}

div.pane-content {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1.5em;
}

div.match-table {
}

div.match-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px auto;
  padding: 0.25em 4em;
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
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  display: flex;
  flex-direction: row;
}

div.match-cell-info > div {
  flex: auto;
  padding-left: 3em;
  padding-right: 3em;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
}

div.match-cell-info > div > div {
  flex: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.game-icon {
  font-size: 0.7em;
}

.player-winner {
  color: #0c9a9a;
}

.player-looser {
  color: dimgrey;
}
</style>
