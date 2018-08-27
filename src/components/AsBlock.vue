<template>
  <div class="">
    <q-field
      class="field"
      icon="group_work"
      prefix="AS Name:"
      :label="`AS${as.number}`"
      label-width="1"
      type="text"
    >
      <q-input
        class="input"
        v-model="name"
        :float-label="asName"
        placeholder="Please enter AS name"
      />
      <q-btn
        label="Submit"
        color="blue-9"
        @click="configName"
      />
    </q-field>
  </div>
</template>

<style lang="stylus">

</style>

<script>
export default {
  name: 'AsBlock',
  props: ['as'],
  data () {
    return {
      name: ''
    }
  },
  computed: {
    asName () {
      return this.as.name || 'AS Name'
    }
  },
  methods: {
    configName () {
      this.$store.commit('example/configName', {
        asNumber: this.as.number,
        newName: this.name
      })
      // Clear the input field so that the floating label can drop
      this.name = ''
    }
  }
}
</script>
