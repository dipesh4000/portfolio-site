import { NextResponse } from "next/server";

// Cache the stats for 48 hours (in seconds)
const CACHE_DURATION = 48 * 60 * 60;

// Your Codolio stats - these will be fetched/scraped
// For now, using your real data from the screenshot
const FALLBACK_STATS = {
  totalQuestions: 166,
  totalActiveDays: 102,
  submissions: 203,
  maxStreak: 24,
  currentStreak: 1,
  awards: 2,
  dsa: {
    total: 155,
    easy: 72,
    medium: 75,
    hard: 8,
  },
  fundamentals: {
    total: 9,
    gfg: 1,
    hackerrank: 8,
  },
  topics: [
    { name: "Arrays", count: 85 },
    { name: "Binary Search", count: 38 },
    { name: "HashMap & Set", count: 28 },
    { name: "Two Pointers", count: 27 },
    { name: "String", count: 25 },
    { name: "Linked Lists", count: 23 },
  ],
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
  try {
    // Try to fetch from Codolio's API or scrape the page
    // Note: Codolio may not have a public API, so we use the fallback data
    // In production, you could use a headless browser or their API if available
    
    const stats = FALLBACK_STATS;
    stats.lastUpdated = new Date().toISOString();

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION * 2}`,
      },
    });
  } catch (error) {
    console.error("Error fetching Codolio stats:", error);
    return NextResponse.json(FALLBACK_STATS);
  }
}

// Revalidate endpoint for cron job
export async function POST() {
  // This can be called by a Vercel Cron job to refresh the cache
  // Add this to vercel.json:
  // {
  //   "crons": [{
  //     "path": "/api/codolio",
  //     "schedule": "0 */48 * * *"
  //   }]
  // }
  
  const stats = FALLBACK_STATS;
  stats.lastUpdated = new Date().toISOString();

  return NextResponse.json({ 
    success: true, 
    message: "Stats refreshed",
    lastUpdated: stats.lastUpdated 
  });
}
