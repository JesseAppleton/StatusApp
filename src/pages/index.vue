<template>
  <v-app>
    <!-- Top Bar -->
    <v-app-bar :elevation="1">
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer" /> -->
      <v-toolbar-title>Status: STATUS HERE</v-toolbar-title>

      <!-- Dark Mode Toggle -->
      <v-btn
        icon
        @click="toggleDarkMode"
      >
        <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Content -->
    <v-main>
      <v-container>
        <SteamProfile />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import SteamProfile from "@/components/SteamProfile.vue";
import { ref, computed } from "vue";
import { useTheme } from "vuetify";

// const drawer = ref(false);
const theme = useTheme();

const isDark = computed(() => theme.global.current.value.dark);
const toggleDarkMode = () => {
  theme.global.name.value = isDark.value ? "light" : "dark";
};
</script>
