import {Verb} from "@/protocol/commands"; import {Noun} from
"@/protocol/commands"; import {Noun} from "@/protocol/commands"; import {Verb}
from "@/protocol/commands";
<template>
  <div>
    <div>
      <input type="text" id="text" v-model="txMessage" />
      <input type="button" value="SEND" v-on:click="sendText" />
    </div>
    <div>
      <div id="content">
        <div v-bind="rxMessage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import showcaseService from "@/services/showcase.service";
import { Command, Noun, Verb } from "@/protocol/commands";

@Component({})
export default class App extends Vue {
  public txMessage: string = "";
  public rxMessage: string = "";

  public created() {}

  public sendText() {
    const command: Command = new Command(Noun.TEST, Verb.TEXT, {
      message: this.txMessage
    });

    showcaseService.send(command);
    this.txMessage = "";
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
