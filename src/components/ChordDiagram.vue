<template>
  <div class="diagram">
    <svg
      id="12345"
      :width="width"
      :height="height"
    />
  </div>
</template>

<style lang="stylus">
  body
    font: 10px sans-serif

  .group-tick line
    stroke: #000

  .ribbons
    fill-opacity: 0.67

  .as-number
    font-size: 20px

  #legend
    display: inline

</style>

<script>
import * as d3 from 'd3'

export default {
  name: 'ChordDiagram',
  // Diagram settings
  data () {
    return {
      // https://github.com/d3/d3-format#locale_formatPrefix
      formatValue: d3.formatPrefix(',.0', 1e3),
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
  // Properties used to provide user interactive operations
  // TODO: Some props should be required
  props: {
    id: Number,
    // buckeType: Date,
    // clickable: Boolean,
    // brushable: Boolean,
    // singleColor: Boolean,
    width: Number,
    height: Number,
    series: Array,
    asList: Array,
    // TODO: Option settings
    options: {
      // tick: Boolean,
      label: Boolean,
      legend: Boolean
    }
  },
  // Components based on width and height
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
    // Draw the diagram
    render () {
      let that = this
      let matrix = this.series
      // const formatValue = this.formatValue

      // Select SVG and set dimentions
      let svg = d3.select(`[id="${this.id}"]`),
        width = this.width,
        height = this.height,
        outerRadius = this.outerRadius

      // Chord diagram components
      const chord = this.chord
      let arc = this.arc
      let ribbon = this.ribbon
      const color = this.color

      // Remove old diagram
      if (d3.select(`[id="${this.id}"] g`)) {
        d3.select(`[id="${this.id}"] g`).remove()
      }

      let g = svg.append('g')
        // Center the diagram
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        // Insert data
        .datum(chord(matrix))

      let group = g.append('g')
        .attr('class', 'groups')
        .selectAll('g')
        .data(chords => { return chords.groups })
        .enter().append('g')

      let arcPath = group.append('path')
        .style('fill', (d) => { return color(d.index) })
        .style('stroke', (d) => { return d3.rgb(color(d.index)).darker() })
        .attr('d', arc)

      // TODO: Center AS labels
      // https://css-tricks.com/centering-percentage-widthheight-elements/
      let asLabel = group.append('g')
        .attr('class', 'as-label')
        .datum(d => { return that.asLabels(d, d.index) })
        .attr('transform', d => {
          return `rotate(${(d.angle * 180 / Math.PI - 90)}) translate(${outerRadius + 25}, -15)`
        })

      asLabel.append('g')
        .attr('class', 'as-number')
        .append('text')
        .attr('transform', 'rotate(90)')
        .text(d => { return d.asNum })

      asLabel.append('g')
        .attr('class', 'as-name')
        .append('text')
        .attr('transform', 'rotate(90) translate(0, 15)')
        .text(d => { return d.asName })

      // let groupTick = group.selectAll('.group-tick')
      //   .data((d) => { return that.groupTicks(d, 1e3) })
      //   .enter().append('g')
      //   .attr('class', 'group-tick')
      //   .attr('transform', (d) => { return `rotate(${(d.angle * 180 / Math.PI - 90)}) translate(${outerRadius}, 0)` })
      //
      // groupTick.append('line')
      //   .attr('x2', 6)
      //
      // groupTick
      //   .filter((d) => { return d.value % 5e3 === 0 })
      //   .append('text')
      //   .attr('x', 8)
      //   .attr('dy', '.35em')
      //   .attr('transform', (d) => { return d.angle > Math.PI ? 'rotate(180) translate(-16)' : null })
      //   .style('text-anchor', (d) => { return d.angle > Math.PI ? 'end' : null })
      //   .text((d) => { return formatValue(d.value) })

      let ribbonPath = g.append('g')
        .attr('class', 'ribbons')
        .selectAll('path')
        .data((chords) => { return chords })
        .enter().append('path')
        .attr('d', ribbon)
        .style('fill', d => { return color(d.source.index) })
        .style('stroke', d => { return d3.rgb(color(d.source.index)).darker() })
    },
    // Returns an array of tick angles and values for a given group and step
    groupTicks (d, step) {
      // Calculate angle per value increment
      let k = (d.endAngle - d.startAngle) / d.value

      let range = d3.range(0, d.value, step)

      return range.map((value) => {
        return {
          value: value,
          angle: value * k + d.startAngle
        }
      })
    },
    // Return the AS info and mid-point's angle of each group
    asLabels (d, i) {
      let k = (d.endAngle - d.startAngle) / d.value
      let midPoint

      if (d.value % 2 === 0) {
        midPoint = d.value / 2 * k + d.startAngle
      } else {
        midPoint = (d.value + 1) / 2 * k + d.startAngle
      }

      return {
        asNum: this.asList[i].number,
        asName: this.asList[i].name,
        angle: midPoint
      }
    },
    // TODO: Legend
    legend () {
      // const asList = this.$store.state.as.asList
      // d3.select('#legend')
      //   .attr('width', 200)
      //   .attr('height', 400)
      //   .data(asList.name)
      //   .enter()
      //   .append('div')
      //   .text(asList.name)
      // let g = svg.append('g')
    }
  },
  mounted () {
    this.render()
    this.legend()
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
