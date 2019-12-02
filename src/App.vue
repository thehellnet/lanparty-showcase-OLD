<template>
  <div id="content"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Client, over } from "stompjs";

@Component({})
export default class App extends Vue {
  created() {
    const webSocket: WebSocket = new WebSocket(
      "ws://127.0.0.1:8080/lanparty_manager/api/public/ws/showcase"
    );

    const stompClient: Client = over(webSocket);

    stompClient.connect(
      {},
      frame => {
        console.log(frame);
      },
      error => {
        console.log(error);
      }
    );

    stompClient.subscribe("test", message => {
      console.log(message);
    });
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
