<template>
  <div>
    <div>
      <input type="text" id="text" v-model="text" />
      <input type="button" value="SEND" v-on:click="sendText" />
    </div>
    <div>
      <div id="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Client, over } from "stompjs";

@Component({})
export default class App extends Vue {
  private TAG: string = "showcase1";
  public text: string = "";

  private stompClient!: Client;

  public created() {
    const webSocket: WebSocket = new WebSocket(
      "ws://127.0.0.1:8080/lanparty_manager/api/public/ws/showcase/" + this.TAG
    );

    this.stompClient = over(webSocket);

    this.stompClient.connect(
      {},
      frame => {
        console.log(frame);
      },
      error => {
        console.log(error);
      }
    );

    this.stompClient.subscribe("test", message => {
      console.log(message);
    });
  }

  public sendText() {
    this.stompClient.send("test2", this.text);
    this.text = "";
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
