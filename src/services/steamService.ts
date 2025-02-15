
import axios from "axios";

const API_PROXY_URL = "https://steam-api-proxy.appleton-jesse.workers.dev/"; // Cloudflare Worker URL

export async function getPlayerSummary() {
    try {
        const response = await axios.get(API_PROXY_URL);
        return response.data.response.players[0];
    } catch (error) {
        console.error("Error fetching player summary:", error);
        throw error;
    }
}