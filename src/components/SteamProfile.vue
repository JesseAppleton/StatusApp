<template>
  <v-container class="status-container">
    <!-- Game Logo Row (Background matches status) -->
    <v-row
      :style="{ backgroundColor: statusColor }"
      class="game-row"
    >
      <v-col class="d-flex justify-center align-center">
        <v-img
          :src="player.gameLogo"
          class="game-logo"
        />
      </v-col>
    </v-row>
  
    <!-- User Info Row -->
    <v-row
      align="center"
      justify="space-between"
      class="user-info"
    >
      <!-- Left: User Avatar -->
      <v-col cols="auto">
        <v-avatar size="64">
          <img
            :src="player.avatar"
            alt="User Avatar"
            class="avatar-img"
          >
        </v-avatar>
      </v-col>
  
      <!-- Center: Name, Status Dot, and Status Message -->
      <v-col>
        <div class="d-flex align-center">
          <v-icon
            :color="statusColor"
            class="mr-2"
          >
            mdi-circle
          </v-icon>
          <span class="text-h6">{{ player.name }}</span>
        </div>
        <div class="text-body-2">
          {{ statusMessage }}
        </div>
      </v-col>
      <v-col>
        <LastHour />
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup lang="ts">
  import LastHour from "@/components/LastHour.vue";

  import { computed, onMounted } from "vue";
  import { useSteamService } from "@/services/steamService";
  
  const { player, fetchSteamData } = useSteamService();
  
  const statusColor = computed(() => {
  if (player.value.game) {
    if (player.value.game.toLowerCase().includes("overwatch")) {
      return "#FF5252"; // Red
    }
    return "#FFC107"; // Yellow
  }
  if (player.value.status === 1) {
    return "#4CAF50"; // Green
  }
  return "#757575"; // Grey
});

const statusMessage = computed(() => {
  if (player.value.game) {
    return `Playing ${player.value.game}`;
  }
  if (player.value.status === 0) {
    return "Offline";
  }
  if (player.value.status === 2) {
    return "Away";
  }
  return "Online";
});
  
  onMounted(() => {
    fetchSteamData();
  });
</script>
  
<style scoped>
  .status-container {
    width: 100%;
    max-width: 800px;
    height: 480px;
    display: flex;
    flex-direction: column;
  }
  
  .game-row {
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .game-logo {
    max-width: 100%;
    max-height: 185px;
    height: auto;
    object-fit: contain;
  }
  
  .user-info {
    height: 60%;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  
  .avatar-img {
    object-fit: cover;
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
</style>
  