<template>
  <v-container style="padding: 10px;" class="d-flex">
    <v-skeleton-loader
      v-if="!player"
      :elevation="2" 
      type="card-avatar"
    />
    <v-card 
      v-if="player"
      :elevation="2"
      variant="tonal"
    >
      <!-- Top image -->
      <v-row>
        <v-img
          class="mx-auto"
          height="200"
          width="500"
          src="https://bad.src/not/valid"
        />
      </v-row>
      <!-- Start content -->
      <v-row>
        <v-col>
          <v-avatar size="50">
            <v-img :src="avatarFull" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-row>
            <p> 
              <span class="bold">{{ player.personaname }}</span>
              <span v-if="statusText == 'Online' && !playerState" class="online"> - {{ statusText }}</span>
              <span v-if="statusText == 'Offline'" class="offline"> - {{ statusText }}</span>
              <span v-else-if="playerState" class="focused"> - {{ playerState }}</span>
            </p>
          </v-row>
          <v-row>
            <p class="bold">
              Last Hour
            </p>

            <!-- <v-sparkline
              :auto-line-width="autoLineWidth"
              :fill="fill"
              :gradient="gradient"
              :gradient-direction="gradientDirection"
              :line-width="width"
              :model-value="value"
              :padding="padding"
              :smooth="radius || false"
              :stroke-linecap="lineCap"
              :type="type"
              auto-draw
            /> -->
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <div>
    <p>
      All Data: 
      {{ player }}
    </p>
  </div>
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
  .bold{
    font-weight: bolder;
  }
</style>