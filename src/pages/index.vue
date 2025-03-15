<template>
  <v-app>
    <!-- Content -->
    <v-main>
      <v-container>
        <SteamProfile />
      </v-container>
      <!-- <v-container>
        <v-btn icon @click="toggleDarkMode">
          <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
        </v-btn>
      </v-container> -->
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import SteamProfile from "@/components/SteamProfile.vue";
import { computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const isDark = computed(() => theme.global.current.value.dark);
const toggleDarkMode = () => {
  theme.global.name.value = isDark.value ? "light" : "dark";
};
</script>
