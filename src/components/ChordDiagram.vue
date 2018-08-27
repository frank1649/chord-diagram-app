<template>
  <div class="diagram">
    <svg
      id="12345"
      :width="width"
      :height="height"/>
  </div>
</template>

<style lang="stylus">
  body
    font: 10px sans-serif

  .group-tick line
    stroke: #000

  .ribbons
    fill-opacity: 0.67

</style>

<script>
import * as d3 from 'd3'

export default {
  name: 'ChordDiagram',
  // Chord diagram settings.
  data () {
    return {
      // Formating numbers for human consumption.
      // https://github.com/d3/d3-format#locale_formatPrefix
      formatValue: d3.formatPrefix(',.0', 1e3),
      // The outter part of the diagram composed by arcs.
      chord: d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending),
      // https://github.com/d3/d3-scale-chromatic
      color: d3.scaleOrdinal(d3.schemePastel1)
      // color: d3.scaleOrdinal()
      //   .domain(d3.range(5))
      //   .range(['#9ecae1', '#1f77b4', '#756bb1', '#7f7f7f', '#c7c7c7'])
    }
  },
  // TODO: Some props must be required
  // Properties used to provide user interactive operations.
  props: {
    id: Number,
    // buckeType: Date,
    // clickable: Boolean,
    // brushable: Boolean,
    // singleColor: Boolean,
    width: Number,
    height: Number,
    // The input data.
    series: Array,
    // Options of the diagram.
    options: {
    }
  },
  // Chord diagram components.
  computed: {
    outerRadius () {
      return Math.min(this.width, this.height) * 0.5 - 40
    },
    innerRadius () {
      return this.outerRadius - 30
    },
    arc () {
      return d3.arc()
        .innerRadius(this.innerRadius)
        .outerRadius(this.outerRadius)
    },
    ribbon () {
      return d3.ribbon()
        .radius(this.innerRadius)
    }
  },
  methods: {
    // Draw the chord diagram.
    render () {
      let that = this
      let matrix = this.series

      // SVG selection and diagrma size settings.
      let svg = d3.select(`[id="${this.id}"]`),
        width = this.width,
        height = this.height,
        outerRadius = this.outerRadius

      const formatValue = this.formatValue

      // Chord diagram components.
      const chord = this.chord
      let arc = this.arc
      let ribbon = this.ribbon
      const color = this.color

      // Remove previous SVG element if presented.
      if (d3.select('g')) {
        d3.select('g').remove()
      }

      let g = svg.append('g')
        // Center the diagram in g.
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        // Append chord (containing the data) to g.
        .datum(chord(matrix))

      let group = g.append('g')
        .attr('class', 'groups')
        .selectAll('g')
        .data((chords) => { return chords.groups })
        .enter().append('g')

      group.append('path')
        .style('fill', (d) => { return color(d.index) })
        .style('stroke', (d) => { return d3.rgb(color(d.index)).darker() })
        .attr('d', arc)

      let groupTick = group.selectAll('.group-tick')
        .data((d) => { return that.groupTicks(d, 1e3) })
        .enter().append('g')
        .attr('class', 'group-tick')
        .attr('transform', (d) => { return `rotate(${(d.angle * 180 / Math.PI - 90)}) translate(${outerRadius}, 0)` })

      groupTick.append('line')
        .attr('x2', 6)

      groupTick
        .filter((d) => { return d.value % 5e3 === 0 })
        .append('text')
        .attr('x', 8)
        .attr('dy', '.35em')
        .attr('transform', (d) => { return d.angle > Math.PI ? 'rotate(180) translate(-16)' : null })
        .style('text-anchor', (d) => { return d.angle > Math.PI ? 'end' : null })
        .text((d) => { return formatValue(d.value) })

      g.append('g')
        .attr('class', 'ribbons')
        .selectAll('path')
        .data((chords) => { return chords })
        .enter().append('path')
        .attr('d', ribbon)
        .style('fill', (d) => { return color(d.target.index) })
        .style('stroke', (d) => { return d3.rgb(color(d.target.index)).darker() })
    },
    // Returns an array of tick angles and values for a given group and step.
    groupTicks (d, step) {
      let k = (d.endAngle - d.startAngle) / d.value
      return d3.range(0, d.value, step).map((value) => {
        return {value: value, angle: value * k + d.startAngle}
      })
    }
  },
  mounted () {
    this.render()
  },
  watch: {
    width () {
      this.render()
    },
    height () {
      this.render()
    },
    series () {
      this.render()
    }
  }
}

</script>