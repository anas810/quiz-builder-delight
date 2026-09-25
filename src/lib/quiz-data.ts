export type Difficulty = "easy" | "medium" | "hard";

export type QuizQuestion = {
  question: string;
  highlight?: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
};

/**
 * Question pool. Every answer is verified against the official Maze of Gains
 * whitepaper (onchainheroes.notion.site/mog) and the MoG wiki (wiki.playmog.xyz).
 * Each page load draws 15 — 5 easy, 5 medium, 5 hard — at random.
 */
export const QUESTION_POOL: QuizQuestion[] = [
  // ── Easy: game basics ────────────────────────────────────────────────
  {
    question: "What kind of game is Maze of Gains?",
    highlight: "Maze of Gains",
    options: [
      "A puzzle platformer",
      "An onchain turn-based roguelike dungeon crawler",
      "A farming sim",
      "A racing game",
    ],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Who develops Maze of Gains?",
    options: ["Sky Mavis", "Onchain Heroes", "Yuga Labs", "Dapper Labs"],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Which blockchain does Maze of Gains run on?",
    options: ["Optimism", "Arbitrum", "Abstract", "Base"],
    correctIndex: 2,
    difficulty: "easy",
  },
  {
    question: "How many floors does one Arcade run span?",
    options: ["5", "8", "10", "20"],
    correctIndex: 2,
    difficulty: "easy",
  },
  {
    question: "Who is the boss waiting on floor 10?",
    options: ["Sir Jackalot", "The Corn King", "Lord Dragma", "The Pale Ghost"],
    correctIndex: 0,
    difficulty: "easy",
  },
  {
    question: "Which wallet do you need to play MoG?",
    options: ["Phantom", "Abstract Global Wallet", "Trust Wallet", "All of the above"],
    correctIndex: 3,
    difficulty: "easy",
  },
  {
    question: "Which mode is MoG's main game mode?",
    options: ["Arcade", "World's Eve", "Expedition", "Silo"],
    correctIndex: 0,
    difficulty: "easy",
  },
  {
    question: "What resource runs out and ends your run?",
    options: ["Health", "Energy", "Mana", "Stamina"],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    question: "How do you move and attack in a run?",
    options: ["Mouse clicks only", "The arrow keys", "WASD only", "Tapping the minimap"],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    question: "What do you look for to reach the next floor?",
    options: ["A portal", "Stairs", "A ladder", "A teleport scroll"],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Which blockchain does Axie: Den of Mysteries run on?",
    highlight: "Axie: Den of Mysteries",
    options: ["Arbitrum", "Ethereum mainnet", "Ronin", "Solana"],
    correctIndex: 2,
    difficulty: "easy",
  },
  {
    question: "Who develops Maze of Gains, Yield Fields and Axie: Den of Mysteries?",
    options: ["Sky Mavis", "Onchain Heroes", "Tioland", "Pixel Vault"],
    correctIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Which chain is Yield Fields built on?",
    highlight: "Yield Fields",
    options: ["Robinhood Chain", "Polygon", "Solana", "Optimism"],
    correctIndex: 0,
    difficulty: "easy",
  },


  // ── Medium: economy, rooms, systems ──────────────────────────────────
  {
    question: "What does one Arcade Key cost?",
    options: ["Free", "1 USD, paid in USDC or ETH", "5 USD, USDC only", "0.1 ETH"],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    question: "What is MoG's primary reward currency?",
    options: ["VALOR, pegged to USDC", "Golden Corn", "Ethereum", "ABS tokens"],
    correctIndex: 0,
    difficulty: "medium",
  },
  {
    question: "What happens when you put more keys into a run?",
    options: [
      "Nothing, keys only unlock the run",
      "It multiplies your Treasure yield and instant-reward chances",
      "It adds extra floors",
      "It lowers enemy damage",
    ],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    question: "What sets your share of the Weekly Prize Pool?",
    options: ["Your Treasure yield for the week", "Your level", "Your play time", "Random draw"],
    correctIndex: 0,
    difficulty: "medium",
  },
  {
    question: "What do you spend at a Shrine to restore Energy?",
    options: ["Treasure", "Keys", "XP", "Golden Corn"],
    correctIndex: 0,
    difficulty: "medium",
  },
  {
    question: "What does the Armory require before you can buy an item?",
    options: ["A free inventory slot", "A full Energy bar", "Beating the floor boss", "A VIP Pass"],
    correctIndex: 0,
    difficulty: "medium",
  },
  {
    question: "What is The Throne?",
    options: [
      "The final boss arena on floor 10",
      "A weekly jackpot that grows until a winner takes it",
      "A leaderboard title for the top player",
      "A premium battle pass",
    ],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    question: "What does the Unknown Trainer offer?",
    options: [
      "A free level-up",
      "Swapping an owned talent for a random new one",
      "Selling your Treasure",
      "An extra inventory slot",
    ],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    question: "During a Blizzard, how do you get a frozen drop?",
    options: ["Wait for it to thaw", "Bump it once to crack the ice", "Attack it three times", "You cannot"],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    question: "What does frostbite do to you?",
    options: [
      "Makes your attacks cost Energy",
      "Freezes you in place",
      "Halves your Treasure",
      "Blocks talents",
    ],
    correctIndex: 0,
    difficulty: "medium",
  },
  {
    question: "Who is the boss waiting on floor 10 of Axie: Den of Mysteries 2.0?",
    options: ["Kilnbane", "Sir Jackalot", "The Werewolf", "Lord Dragma"],
    correctIndex: 0,
    difficulty: "medium",
  },
  {
    question: "Which currencies buy Keys in Axie: Den of Mysteries 2.0?",
    options: ["USDC, RON, WETH or AXS", "BTC only", "SOL and AVAX", "Golden Corn only"],
    correctIndex: 0,
    difficulty: "medium",
  },
  {
    question: "What is the total supply of Yield Fields Founding Deeds?",
    options: ["1,000", "3,333", "5,555", "10,000"],
    correctIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Do you need a Deed to play Yield Fields?",
    options: [
      "Yes, a Deed is required",
      "No — anyone can farm, Deed holders just get an extra loop",
      "Only for co-op fields",
      "Only during Season One",
    ],
    correctIndex: 1,
    difficulty: "medium",
  },


  // ── Hard: exact numbers and fine detail ──────────────────────────────
  {
    question: "How much base Energy do you start a run with?",
    options: ["50", "75", "100", "150"],
    correctIndex: 2,
    difficulty: "hard",
  },
  {
    question: "What do moving and attacking cost?",
    options: [
      "Moving costs 1 Energy, attacking costs none",
      "Both cost 1 Energy",
      "Moving is free, attacking costs 1",
      "Both are free",
    ],
    correctIndex: 0,
    difficulty: "hard",
  },
  {
    question: "After how many turns do drops left on the ground expire?",
    options: ["10", "20", "35", "They never expire"],
    correctIndex: 1,
    difficulty: "hard",
  },
  {
    question: "When does the MoG weekly cycle reset?",
    options: [
      "Monday 00:00 UTC",
      "Thursday 4:00 PM UTC",
      "Sunday 12:00 UTC",
      "Friday 8:00 PM UTC",
    ],
    correctIndex: 1,
    difficulty: "hard",
  },
  {
    question: "What share of The Throne jackpot does the winner take?",
    options: ["50%", "70%", "80%", "100%"],
    correctIndex: 2,
    difficulty: "hard",
  },
  {
    question: "Which floors make up the Frostfields?",
    options: ["1–2", "3–4", "5–7", "8–9"],
    correctIndex: 2,
    difficulty: "hard",
  },
  {
    question: "An Armored skeleton strikes which tiles?",
    options: [
      "All four tiles directly beside it",
      "All eight surrounding tiles",
      "Its whole row",
      "One marked tile",
    ],
    correctIndex: 0,
    difficulty: "hard",
  },
  {
    question: "How far does an exploding mushroom's blast reach?",
    options: [
      "Only the tile it stands on",
      "The four adjacent tiles",
      "All eight surrounding tiles, diagonals included",
      "Three tiles in a line",
    ],
    correctIndex: 2,
    difficulty: "hard",
  },
  {
    question: "Why can't you damage a frog egg cluster?",
    options: [
      "It is shielded while any frog it spawned is alive",
      "It must be burned",
      "It is invulnerable until floor 9",
      "It needs a ranged talent",
    ],
    correctIndex: 0,
    difficulty: "hard",
  },
  {
    question: "What is the weekly Marble cap that resets each cycle?",
    options: ["100", "500", "1,000", "10,000"],
    correctIndex: 2,
    difficulty: "hard",
  },
  {
    question: "How long does common weather last on a floor?",
    options: ["5–10 turns", "35–45 turns", "The whole run", "Until you take damage"],
    correctIndex: 1,
    difficulty: "hard",
  },
  {
    question: "How many Yield Fields Deed whitelist spots were up for grabs in Deed Season?",
    options: ["333", "500", "850", "1,000"],
    correctIndex: 2,
    difficulty: "hard",
  },
  {
    question: "What resource drains on every move in Axie: Den of Mysteries?",
    options: ["Stamina", "Mana", "Health", "Shards"],
    correctIndex: 0,
    difficulty: "hard",
  },
  {
    question: "What does one Key cost in Axie: Den of Mysteries 2.0?",
    options: ["$0.50", "$1, down from $2", "$2, up from $1", "$5"],
    correctIndex: 1,
    difficulty: "hard",
  },
  {
    question: "How many Keys can you spend on a single Axie: DoM 2.0 run?",
    options: ["10", "25", "50", "100"],
    correctIndex: 3,
    difficulty: "hard",
  },
  {
    question: "In Deed Season, how did players earn Silo and Raffle entries?",
    options: [
      "By spending Golden Corn and World's Eve items",
      "By staking VALOR",
      "By holding a Deed already",
      "By beating Sir Jackalot ten times",
    ],
    correctIndex: 0,
    difficulty: "hard",
  },
];


export type Rank = { title: string; blurb: string };

/** Rank titles use real Maze of Gains / Onchain Heroes vocabulary. */
export function getRank(score: number, total: number): Rank {
  if (score === total)
    return { title: "Certified Mogger", blurb: "Perfect run — you earned the Mogger badge in spirit." };
  if (score >= 12) return { title: "Silo Stocker", blurb: "You stack knowledge like the top Silo boards stack Corn." };
  if (score >= 9) return { title: "Expeditioner", blurb: "You go deep in the maze — a few floors are still dark." };
  if (score >= 5) return { title: "Corn Farmer", blurb: "You know the farm, not yet the maze." };
  return { title: "Fresh Spawn", blurb: "The maze ate your loot. Time to learn the corridors." };
}
