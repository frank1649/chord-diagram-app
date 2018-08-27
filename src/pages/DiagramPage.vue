<template>
  <q-page class="q-ma-xl">
    <h3>Chord Diagram</h3>
    <chord-diagram
      :id="id"
      :width="size.width"
      :height="size.height"
      :series="series"
    />
    <diagram-tool
      :size.sync="size"
    />
  </q-page>
</template>

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
      series: this.$store.state.example.series,
      asList: this.$store.state.example.asList
    }
  },
  components: {
    ChordDiagram,
    DiagramTool
  }
}
</script>
