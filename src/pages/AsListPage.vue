<template>
  <q-page class="q-ma-xl">
    <h3>AS List</h3>
    <as-block
      v-for="as in asList"
      :as="as"
      :key="as.number"
    />
  </q-page>
</template>

<style lang="stylus">
</style>

<script>
import AsBlock from '../components/AsBlock.vue'

export default {
  name: 'AsListPage',
  data () {
    return {
      asList: this.$store.state.example.asList
    }
  },
  components: {
    AsBlock
  }
}
</script>
