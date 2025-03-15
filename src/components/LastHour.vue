<template>
  <p>
    Last Hour
    <v-sparkline
      :auto-line-width="autoLineWidth"
      :fill="fill"
      :gradient="gradient"
      :line-width="width"
      :model-value="value"
      :padding="padding"
      :smooth="radius || false"
      :stroke-linecap="lineCap"
      auto-draw
    />
  </p>
</template>
  
<script lang="ts">
    const gradients = ['#f72047', '#ffd200', '#1feaea']
  
    export default {
      data: () => ({
        width: 2,
        radius: 10,
        padding: 8,
        lineCap: 'round',
        gradient: gradients,
        value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
        gradients,
        fill: false,
        autoLineWidth: false,
      }),
    }
</script>