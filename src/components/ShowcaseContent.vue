import {PaneMode} from "@/models/pane";
<template>
  <div id="content">
    <slot name="current" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Pane, PaneMode } from "@/models/pane";
import MatchesPane from "@/components/pane/MatchesPane.vue";
import ScoresPane from "@/components/pane/ScoresPane.vue";
import SingleMatchPane from "@/components/pane/SingleMatchPane.vue";

@Component({
  components: { SingleMatchPane, ScoresPane, MatchesPane }
})
export default class ShowcaseContent extends Vue {
  public panes: Pane[] = [
    { id: 1, mode: PaneMode.SCORES },
    { id: 2, mode: PaneMode.MATCHES },
    { id: 3, mode: PaneMode.SINGLE_MATCH }
  ];

  created() {}
}
</script>

<style scoped>
div#content {
  flex: 1 0 auto;
  background: #222222;
}
</style>
