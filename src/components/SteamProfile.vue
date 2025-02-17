<template>
  <v-container>
    <v-skeleton-loader
      v-if="!player"
      :elevation="2" 
      type="card-avatar"
      width="700"
    />
    <v-card 
      v-if="player"
      :elevation="2"
      variant="tonal"
      width="700"
    >
      <!-- Top image -->
      <v-img
        id="banner-image"
        class="mx-auto"
        cover
        src="@/assets/pexels-thatguycraig000-1563356.jpg"
        position="center"
        background-color="info"
      />
      <v-card-text class="d-flex" style="height: 100px;">
        <v-avatar :image="avatarFull" size="x-large" />
        
        <p> 
          <span class="bold">{{ player.personaname }}</span>
          <span v-if="statusText == 'Online' && !playerState" class="online"> - {{ statusText }}</span>
          <span v-if="statusText == 'Offline'" class="offline"> - {{ statusText }}</span>
        </p>
        <p v-if="playerState" :text="playerState" class="focused"> - {{ playerState }}</p>
        <!-- <LastHour /> -->
      </v-card-text>
      <v-card-text height="50">
        <LastHour />
      </v-card-text>
      <!-- Start content -->
    </v-card>
  </v-container>
  <!-- <div>
    <p>
      All Data: 
      {{ player }}
    </p>
  </div> -->
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

      const avatarFull = computed(() => {
        if (!player.value) return 'Unknown';

        return player.value.avatarfull;
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
        // if status = 1, check game info?
        return statusMap[player.value.personastate] || 'Unknown';
      });

      const playerState = computed(() => {
        if (!player.value.gameextrainfo) return null;
        const gameInfo: string = player.value.gameextrainfo;
        return gameInfo || null;
      });

      
  
      return { player, statusText, avatarFull, playerState };
    },
});

  
</script>



<style>
  .focused {
    color: yellow;
  }
  .offline {
    color: #424242;
  }
  .online {
    color: white;
  }
  .bold {
    font-weight: bolder;
  }
  #banner-image {
    height: 200px;
    background: linear-gradient(0.25turn, #1bcb08, #25d81f00), linear-gradient(gradient-direction), url(@/assets/pexels-thatguycraig000-1563356.jpg);
    width: 100%
  }
</style>