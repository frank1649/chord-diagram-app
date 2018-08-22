<template>
  <div class="q-ma-xl">
    <p>AS List</p>
    <as-block
      v-for="as in asList"
      :as="as"
      :key="as.number"
    />
  </div>
</template>

<style lang="stylus">
</style>

<script>
import AsBlock from '../components/AsBlock.vue'

export default {
  name: 'AsList',
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
