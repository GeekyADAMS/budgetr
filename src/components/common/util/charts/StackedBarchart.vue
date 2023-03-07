<script setup lang="ts">
import type { PropType } from 'vue'

import type { StackedGraphSeries } from '@/types/common/graph.interface'

const props = defineProps({
  series: {
    type: Array as PropType<StackedGraphSeries[]>,
    default: () => []
  }
})

const chartOptions = {
  chart: {
    type: 'bar',
    height: 400,
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 5,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '13px',
            fontWeight: 900
          }
        }
      }
    }
  },
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ]
  },
  yaxis: {
    labels: {
      formatter: function (value: number): string {
        return '$' + value
      }
    }
  },
  legend: {
    position: 'right',
    offsetY: 40
  },
  fill: {
    opacity: 1
  }
}
</script>

<template>
  <div id="chart" class="w-full h-full">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style></style>
