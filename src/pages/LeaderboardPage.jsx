import { useState } from "react";

/**
 * LeaderboardPage
 * ----------------
 * Player-facing leaderboard screen. Matches wireframe frame
 * "06 · Leaderboard" from the I9 concept board exactly (colors,
 * spacing, and the two-tab segmented control for This week / All-time).
 *
 * Renders:
 *   - A header with the screen title
 *   - A segmented control that switches the sort/display between
 *     weekly points and all-time points
 *   - A scrollable ranked list, top 3 highlighted with a filled
 *     orange rank badge and an "up" indicator when `trending` is true
 *   - A "You" row pinned to the bottom of the screen at all times,
 *     so the signed-in player can always see their own rank
 *
 * Data:
 *   This component currently renders from local mock data
 *   (MOCK_LEADERBOARD, CURRENT_USER below) so it can be reviewed and
 *   dropped into the app before the backend is ready. To connect it
 *   to real data, replace those two constants with the result of a
 *   Supabase query (or whatever the team lead sets up) that matches
 *   the same shape — see the comment above each constant.
 *
 * Props: none currently. If the app needs this to receive live data
 * from a parent (instead of fetching its own), the two mock constants
 * can be turned into props — ask before doing this so it matches how
 * the rest of the team is passing data down.
 *
 * Usage:
 *   import LeaderboardPage from "./pages/LeaderboardPage";
 *   <LeaderboardPage />
 */

// One row per player. Replace with a query against your `players`
// (or similar) table once the backend is ready.
//   id            number | string — unique player id
//   name          string           — display name shown in the row
//   weeklyPoints  number           — points earned this reset cycle
//   allTimePoints number           — cumulative points across all time
//   trending      boolean          — show the small ▲ indicator (true
//                                    for players currently climbing)
const MOCK_LEADERBOARD = [
  { id: 1, name: "Priya M.", weeklyPoints: 410, allTimePoints: 1820, trending: true },
  { id: 2, name: "Arjun S.", weeklyPoints: 380, allTimePoints: 1640, trending: true },
  { id: 3, name: "Devika R.", weeklyPoints: 355, allTimePoints: 1510, trending: true },
  { id: 4, name: "Kabir T.", weeklyPoints: 310, allTimePoints: 1390, trending: false },
  { id: 5, name: "Meher A.", weeklyPoints: 295, allTimePoints: 1275, trending: false },
  { id: 6, name: "Rohan V.", weeklyPoints: 270, allTimePoints: 1180, trending: false },
  { id: 7, name: "Ishita K.", weeklyPoints: 260, allTimePoints: 1120, trending: false },
];

// The signed-in user's own row, kept separate from the list above
// because it's pinned to the bottom of the screen regardless of
// scroll position or where the player actually ranks.
//   name          string — always "You" in this UI
//   rank          number — the player's current numeric rank
//   weeklyPoints  number
//   allTimePoints number
const CURRENT_USER = { name: "You", rank: 9, weeklyPoints: 250, allTimePoints: 1180 };

export default function LeaderboardPage() {
  const [view, setView] = useState("week"); // "week" | "allTime"

  const sorted = [...MOCK_LEADERBOARD].sort((a, b) =>
    view === "week" ? b.weeklyPoints - a.weeklyPoints : b.allTimePoints - a.allTimePoints
  );

  return (
    <div className="flex h-full flex-col bg-[#FBF6EE]">
      {/* Header */}
      <div className="border-b border-[#EDE1D3] bg-white px-4 py-4">
        <h1
          className="text-[17px] font-bold text-[#241B16]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Leaderboard
        </h1>
      </div>

      {/* Segmented control: This week / All-time */}
      <div className="mx-4 mt-3 flex rounded-[11px] bg-[#FBEEE1] p-1">
        {[
          { key: "week", label: "This week" },
          { key: "allTime", label: "All-time" },
        ].map((seg) => (
          <button
            key={seg.key}
            type="button"
            onClick={() => setView(seg.key)}
            className={`flex-1 rounded-[8px] py-2 text-[12px] font-bold transition-colors ${
              view === seg.key ? "bg-white text-[#241B16] shadow-sm" : "text-[#B5471B]"
            }`}
          >
            {seg.label}
          </button>
        ))}
      </div>

      {/* Ranked list */}
      <div className="flex-1 overflow-y-auto pt-2">
        {sorted.map((player, index) => {
          const rank = index + 1;
          const points = view === "week" ? player.weeklyPoints : player.allTimePoints;
          const isTopThree = rank <= 3;
          return (
            <div
              key={player.id}
              className="flex items-center gap-3 border-b border-[#F3E9DA] px-4 py-3"
            >
              <div
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11.5px] font-extrabold ${
                  isTopThree ? "bg-[#E0672A] text-white" : "text-[#8A7A6D]"
                }`}
              >
                {rank}
              </div>
              <div className="h-[34px] w-[34px] flex-shrink-0 rounded-full border border-[#EDE1D3] bg-[#FBEEE1]" />
              <div className="flex-1 truncate text-[13px] font-semibold text-[#241B16]">
                {player.name}
              </div>
              <div className="flex items-center gap-1 text-[13px] font-extrabold text-[#241B16]">
                {player.trending && <span className="text-[10px] text-[#E0672A]">▲</span>}
                {points}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky "You" row — always visible, even if you're off-screen above */}
      <div className="flex items-center gap-3 border-t-[1.5px] border-[#1A1310] bg-white px-4 py-2.5 shadow-[0_-6px_16px_rgba(11,11,11,0.08)]">
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-[11.5px] font-extrabold text-[#8A7A6D]">
          {CURRENT_USER.rank}
        </div>
        <div className="h-[34px] w-[34px] flex-shrink-0 rounded-full border border-[#EDE1D3] bg-[#FBEEE1]" />
        <div className="flex-1 text-[13px] font-semibold text-[#241B16]">{CURRENT_USER.name}</div>
        <div className="text-[13px] font-extrabold text-[#241B16]">
          {view === "week" ? CURRENT_USER.weeklyPoints : CURRENT_USER.allTimePoints}
        </div>
      </div>
    </div>
  );
}