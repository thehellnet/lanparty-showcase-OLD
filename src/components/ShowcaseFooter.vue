<template>
  <v-footer id="footer">
    <div id="clock">{{ clockText }}</div>
    <div class="footer-spacer" />
    <div id="websocket-status">{{ websocketStatusText }}</div>
    <v-spacer />
    <div>
      <img src="../assets/logo_footer.png" alt="Logo" />
    </div>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import statusService from "@/services/status.service";

@Component
export default class ShowcaseFooter extends Vue {
  public clockText: string = "";
  public websocketStatusText: string = "";

  created() {
    this.updateClock();

    statusService.onWebsocketConnected(connected => {
      if (connected) {
        this.websocketStatusText = "";
      } else {
        this.websocketStatusText = "OFFLINE";
      }
    });
  }

  private updateClock() {
    const now = new Date();
    this.clockText = `${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    setTimeout(this.updateClock, 1000);
  }
}
</script>

<style scoped>
#footer {
  flex-shrink: 0;
  margin: 0;
  padding: 6px 16px;
  position: absolute;
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #171717;
  z-index: 1000;
}

#footer div {
  display: flex;
}

div.footer-spacer {
  width: 30px;
}

div#clock {
  color: #f8ffea;
  width: 160px;
  font-weight: bold;
  font-size: xx-large;
  text-transform: uppercase;
}

div#websocket-status {
  color: #350000;
}
</style>
