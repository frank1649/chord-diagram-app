<template>
  <q-page class="q-ma-xl page">
    <h3 class="center">Chord Diagram</h3>
    <chord-diagram
      class="center"
      :id="id"
      :width="size.width"
      :height="size.height"
      :series="series"
      :asList="asList"
    />
    <diagram-tool
      class="center"
      :size.sync="size"
    />
  </q-page>
</template>

<style lang="stylus">
  .center
    margin: 0 auto
    text-align: center
</style>

<script>
import ChordDiagram from '../components/ChordDiagram.vue'
import DiagramTool from '../components/DiagramTool.vue'

export default {
  name: 'DiagramPage',
  data () {
    return {
      id: 12345,
      size: {
        width: 640,
        height: 640
      },
      series: this.$store.state.as.series,
      asList: this.$store.state.as.asList
    }
  },
  components: {
    ChordDiagram,
    DiagramTool
  }
}
</script>
