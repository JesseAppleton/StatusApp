import { ref } from "vue";
import axios from "axios";

const player = ref({
  name: "",
  avatar: "",
  status: 0,
  game: "",
  lastLogOff: 0,
  gameLogo: "",
});

const CLOUDLARE_WORKER_URL = "https://steam-api-proxy.appleton-jesse.workers.dev";

const fetchSteamData = async () => {
  try {
    // Fetch player data first
    const playerResponse = await axios.get(`${CLOUDLARE_WORKER_URL}/player`);
    const playerData = playerResponse.data.response.players[0];

    console.log(playerData);

    // Update player info
    player.value = {
      name: playerData.personaname,
      avatar: playerData.avatarfull,
      status: playerData.personastate,
      game: playerData.gameextrainfo || "",
      lastLogOff: playerData.lastlogoff,
      gameLogo: "",
    };

    // If the player is in a game, construct the game logo URL
    if (player.value.game && playerData.gameid) {
      player.value.gameLogo = `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${playerData.gameid}/logo.png`;
    }
  } catch (error) {
    console.error("Error fetching Steam data:", error);
  }
};

// Periodically refresh data
setInterval(fetchSteamData, 30000); // Refresh every 30 seconds

export function useSteamService() {
  return { player, fetchSteamData };
}
