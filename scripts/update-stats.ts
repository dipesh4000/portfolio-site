import { fetchCodolioSiteStats, writeCodolioStatsFile } from "../lib/codolio-stats";

async function main() {
  const userKey = process.env.CODOLIO_USER_KEY?.trim() || "dipesh4000";
  console.log(`[Stats Update] Fetching stats for Codolio user: ${userKey}...`);
  
  try {
    const stats = await fetchCodolioSiteStats(userKey);
    await writeCodolioStatsFile(stats);
    console.log("[Stats Update] Successfully updated stats in public/data/codio-stats.json");
    console.log(`[Stats Update] Timestamp: ${stats.lastUpdated}`);
  } catch (error) {
    console.error("[Stats Update] Failed to update stats:", error);
    process.exit(1);
  }
}

main();
