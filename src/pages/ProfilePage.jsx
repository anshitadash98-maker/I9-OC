import { useState } from "react";

/**
 * ProfilePage
 * -----------
 * Player-facing profile screen. Matches wireframe frame
 * "07 · Profile" from the I9 concept board exactly (colors, spacing,
 * and layout order).
 *
 * Renders:
 *   - Identity block: avatar, name, current rank + points summary
 *   - A push-notifications toggle (local state only for now — see
 *     note above `notificationsOn`)
 *   - A "Claim history" list of the player's past point claims,
 *     most recent first
 *
 * Data:
 *   This component currently renders from local mock data (USER,
 *   CLAIM_HISTORY below) so it can be reviewed and dropped into the
 *   app before the backend is ready. To connect it to real data,
 *   replace those two constants with the result of a Supabase query
 *   (or whatever the team lead sets up) that matches the same shape
 *   — see the comment above each constant.
 *
 * Props: none currently. If this needs to receive live data from a
 * parent instead of fetching its own, the mock constants can become
 * props — check with the team lead first so it matches how data is
 * passed down elsewhere in the app.
 *
 * Usage:
 *   import ProfilePage from "./pages/ProfilePage";
 *   <ProfilePage />
 */

// The signed-in user's own row. Replace with a query against your
// `players`/`profiles` table once the backend is ready.
//   name          string — always "You" in this UI
//   weeklyRank    number — current rank this reset cycle
//   weeklyPoints  number
//   allTimePoints number
const USER = {
  name: "You",
  weeklyRank: 9,
  weeklyPoints: 250,
  allTimePoints: 1180,
};

// One row per past claim, most recent first. Replace with a query
// against your `claims` table once the backend is ready.
//   id     number | string — unique claim id
//   spot   string           — name of the claimed spawn point
//   when   string           — display-ready relative time, e.g.
//                             "Today, 2:14pm" (format on the backend
//                             or with a date library before passing in)
//   points number           — points earned for this claim
const CLAIM_HISTORY = [
  { id: 1, spot: "Library archway", when: "Today, 2:14pm", points: 10 },
  { id: 2, spot: "Old oak tree", when: "Today, 11:02am", points: 10 },
  { id: 3, spot: "Clocktower", when: "Yesterday, 4:40pm", points: 20 },
];

export default function ProfilePage() {
  // Local state for now — wire this up to your notifications
  // preference in the backend once that's ready (e.g. a column on
  // the player row, updated via Supabase on toggle).
  const [notificationsOn, setNotificationsOn] = useState(true);

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white px-5 py-5">
      {/* Identity */}
      <div className="flex items-center gap-3.5">
        <div className="h-14 w-14 flex-shrink-0 rounded-full border border-[#EDE1D3] bg-[#FBEEE1]" />
        <div>
          <div
            className="text-[16px] font-bold text-[#241B16]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {USER.name}
          </div>
          <div className="text-[11px] text-[#8A7A6D]">
            Rank #{USER.weeklyRank} this week, {USER.weeklyPoints} pts &middot; {USER.allTimePoints}{" "}
            all-time
          </div>
        </div>
      </div>

      <div className="my-3.5 h-px bg-[#EDE1D3]" />

      {/* Push notifications toggle */}
      <div className="flex items-center justify-between py-1">
        <div
          className="text-[16px] font-bold text-[#241B16]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Push notifications
        </div>
        <button
          type="button"
          onClick={() => setNotificationsOn((v) => !v)}
          aria-pressed={notificationsOn}
          aria-label="Toggle push notifications"
          className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
            notificationsOn ? "bg-[#E0672A]" : "bg-[#EDE1D3]"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              notificationsOn ? "translate-x-[22px]" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      <div className="my-3.5 h-px bg-[#EDE1D3]" />

      {/* Claim history */}
      <div
        className="mb-2 text-[16px] font-bold text-[#241B16]"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Claim history
      </div>
      <div>
        {CLAIM_HISTORY.map((claim) => (
          <div key={claim.id} className="flex items-center gap-3 border-b border-[#F3E9DA] py-2.5">
            <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[9px] border border-[#EDE1D3] bg-[#FBEEE1] text-[14px]">
              📍
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-[#241B16]">{claim.spot}</div>
              <div className="text-[11px] text-[#8A7A6D]">{claim.when}</div>
            </div>
            <span className="rounded-full bg-[#FBEEE1] px-2.5 py-1 text-[11.5px] font-bold text-[#B5471B]">
              +{claim.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}