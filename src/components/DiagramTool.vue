<template>
  <div class="toolBox bg-grey-3">
    <q-field dark>
      <q-input
        stack-label="Width"
        v-model="inputWidth"
      />
      <q-input
        stack-label="Height"
        v-model="inputHeight"
      />
      <q-btn
        class="button"
        label="Resize Diagram"
        color="blue-9"
        @click="updateSize"
      />
    </q-field>
  </div>
</template>

<style lang="stylus">
  .toolBox
    padding: 20px
    width: 640px

  .button
    margin-top: 20px
</style>

<script>
export default {
  name: 'DiagramTool',
  props: ['size'],
  data () {
    return {
      // Set the initial value to props' valu
      // NOTE: Directly change the props is agaisnt the design pattern
      inputWidth: this.size.width,
      inputHeight: this.size.height
    }
  },
  methods: {
    // Emit the new size in Int to parent
    updateSize () {
      let size = {
        width: parseInt(this.inputWidth),
        height: parseInt(this.inputHeight)
      }
      return this.$emit('update:size', size)
    }
  }
}
</script>
