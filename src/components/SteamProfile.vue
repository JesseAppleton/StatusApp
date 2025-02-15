<template>
  <div v-if="player">
    <h2>{{ player.personaname }}</h2>
    <img
      :src="player.avatarfull"
      alt="Avatar"
    >
    <p>Status: {{ statusText }}</p>
  </div>
  <p v-else>
    Loading...
  </p>
</template>
  
<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import { getPlayerSummary } from '../services/steamService';
  
  export default defineComponent({
    setup() {
      const player = ref<any>(null);
  
      onMounted(async () => {
        try {
          player.value = await getPlayerSummary();
        } catch (error) {
          console.error('Failed to fetch Steam data:', error);
        }
      });
  
      const statusText = computed(() => {
        if (!player.value) return 'Unknown';
        const statusMap: Record<number, string> = {
          0: 'Offline',
          1: 'Online',
          2: 'Busy',
          3: 'Away',
          4: 'Snooze',
          5: 'Looking to trade',
          6: 'Looking to play',
        };
        return statusMap[player.value.personastate] || 'Unknown';
      });
  
      return { player, statusText };
    },
  });
</script>
  