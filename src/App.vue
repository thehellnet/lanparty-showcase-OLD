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

@Component({})
export default class App extends Vue {
  public txMessage: string = "";
  public rxMessage: string = "";

  public created() {
    showcaseService.onMessage(message => {
      this.rxMessage = message;
    });
  }

  public sendText() {
    showcaseService.send(this.txMessage);
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
