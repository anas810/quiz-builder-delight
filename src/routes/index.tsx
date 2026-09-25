import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { QUESTION_POOL, getRank, type QuizQuestion } from "@/lib/quiz-data";
import { cardPath, tweetUrl } from "@/lib/share";
import { playEnter, playSelect, playFanfare } from "@/lib/sfx";
import bannerAsset from "@/assets/featured-game-banner.gif.asset.json";

const bannerUrl = bannerAsset.url;
import { BrandWordmark } from "@/components/brand-wordmark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maze of Gains Quiz — 15 Questions" },
      {
        name: "description",
        content:
          "How well do you know Maze of Gains? 15 multiple-choice questions, easy to hard, with a score and an in-game rank at the end.",
      },
      { property: "og:title", content: "Maze of Gains Quiz — 15 Questions" },
      {
        property: "og:description",
        content:
          "How well do you know Maze of Gains? 15 multiple-choice questions, easy to hard, with a score and an in-game rank at the end.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TOTAL_QUESTIONS = 15;
const LETTERS = ["A", "B", "C", "D"];

/** Draw 5 easy + 5 medium + 5 hard questions, shuffled inside each tier. */
function drawQuestions(): QuizQuestion[] {
  const pick = (tier: QuizQuestion["difficulty"], count: number) => {
    const pool = QUESTION_POOL.filter((q) => q.difficulty === tier);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };
  return [...pick("easy", 5), ...pick("medium", 5), ...pick("hard", 5)];
}

type Phase = "start" | "playing" | "done";

function Index() {
  const [phase, setPhase] = useState<Phase>("start");
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => drawQuestions());
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const score = useMemo(
    () => questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0),
    [questions, answers],
  );
  const rank = getRank(score, TOTAL_QUESTIONS);

  const startQuiz = () => {
    playEnter();
    setQuestions(drawQuestions());
    setAnswers([]);
    setCurrent(0);
    setPhase("playing");
  };

  const choose = (optionIndex: number) => {
    playSelect();
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = optionIndex;
      return next;
    });
  };

  const descend = () => {
    if (answers[current] === undefined) return;
    if (current + 1 >= TOTAL_QUESTIONS) {
      playFanfare();
      setPhase("done");
    } else {
      playSelect();
      setCurrent((c) => c + 1);
    }
  };

  const tweetHref = tweetUrl(score, rank.title);

  const question = questions[current];
  const selected = answers[current];
  const hasSelected = selected !== undefined;
  const isLast = current + 1 >= TOTAL_QUESTIONS;

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-background font-body text-foreground antialiased selection:bg-volt selection:text-dungeon"
      style={
        phase === "start"
          ? {
              backgroundImage: `linear-gradient(rgba(10, 14, 26, 0.55), rgba(10, 14, 26, 0.55)), url(${bannerUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      <header className="flex items-center justify-between border-b-2 border-black px-5 py-5 sm:px-10">
        <BrandWordmark className="text-[10px] sm:text-sm" />
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
          onchain heroes · abstract
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {phase === "playing"
            ? `Floor ${String(current + 1).padStart(2, "0")}/15`
            : phase === "start"
              ? "15 questions"
              : "Results"}
        </span>
      </header>

      <main className="relative mx-auto w-full max-w-3xl grow px-5 py-10 sm:px-8 sm:py-14">
        {phase === "start" && (
          <>
          <div className="rise relative z-10 rounded-[28px] border-4 border-black bg-card p-6 shadow-[0_10px_0_#000] sm:p-10">

            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-volt">
              Knowledge gauntlet
            </span>
            <h1 className="mt-4 font-display text-3xl leading-[1.15] tracking-tight text-balance sm:text-5xl">
              How well do you know <span className="text-volt">the maze</span>?
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-foreground/75 sm:text-lg">
              Fifteen floors. Four doors each. Questions start easy and get deeper the further you
              descend. Reach the bottom and haul out your score — plus a rank straight from the maze.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-md border-2 border-cyan/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                15 floors
              </span>
              <span className="rounded-md border-2 border-gold/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                4 doors each
              </span>
              <span className="rounded-md border-2 border-magenta/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-magenta">
                Fresh set every run
              </span>
            </div>
            <div className="mt-8">
              <button
                onClick={startQuiz}
                className="pulse-glow rounded-2xl border-2 border-black bg-volt px-10 py-4 font-display text-xl text-dungeon transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
              >
                Enter the maze ↓
              </button>
            </div>
          </div>
          </>
        )}

        {phase === "playing" && question && (
          <>
            <div className="rise mb-8 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-volt">Depth</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-black bg-black">
                <div
                  className="h-full rounded-full bg-volt transition-all duration-500"
                  style={{ width: `${((current + 1) / TOTAL_QUESTIONS) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {current + 1}/15
              </span>
            </div>

            <div key={current} className="rise rounded-[28px] border-4 border-black bg-card p-6 shadow-[0_10px_0_#000] sm:p-10">
              <div className="mb-6 flex items-center gap-2">
                <span className="rounded-md bg-volt px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dungeon">
                  Level {String(current + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {current < 5 ? "Shallow floors" : current < 10 ? "Mid maze" : "The deep"}
                </span>
              </div>

              <h2 className="mb-8 font-display text-2xl leading-[1.15] tracking-tight text-balance sm:text-4xl">
                {question.highlight ? (
                  <>
                    {question.question.split(question.highlight)[0]}
                    <span className="text-volt">{question.highlight}</span>
                    {question.question.split(question.highlight)[1]}
                  </>
                ) : (
                  question.question
                )}
              </h2>

              <div className="grid gap-3">
                {question.options.map((option, i) => {
                  const isSelected = selected === i;
                  return (
                    <button
                      key={i}
                      onClick={() => choose(i)}
                      className={`flex items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left ring-1 ring-black/5 transition-colors duration-150 sm:py-5 ${
                        isSelected
                          ? "pop border-cyan bg-card"
                          : "border-foreground/15 bg-black/25 hover:border-volt hover:bg-black/40"
                      }`}
                    >
                      <span className={`font-display text-sm shrink-0 ${isSelected ? "text-cyan" : "text-foreground/40"}`}>
                        {LETTERS[i]}
                      </span>
                      <span className={`text-base text-pretty sm:text-lg ${isSelected ? "font-bold" : "font-medium"}`}>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={descend}
                  disabled={!hasSelected}
                  className={`rounded-2xl border-2 border-black bg-volt px-8 py-4 font-display text-lg text-dungeon transition-all duration-150 ${
                    hasSelected
                      ? "pulse-glow hover:-translate-y-0.5 active:translate-y-0"
                      : "cursor-not-allowed opacity-30"
                  }`}
                >
                  {isLast ? "Claim your loot ↓" : "Descend ↓"}
                </button>
              </div>
            </div>
          </>
        )}

        {phase === "done" && (
          <div className="grid gap-5">
            <div className="rise">
              <img
                src={cardPath(score)}
                alt={`Score card: ${score} out of ${TOTAL_QUESTIONS}, rank ${rank.title}`}
                width={1200}
                height={630}
                className="w-full rounded-[24px] border-4 border-black shadow-[0_10px_0_#000]"
              />
            </div>

            <div className="rise flex flex-col items-center gap-3">
              <a
                href={tweetHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playSelect}
                className="rounded-2xl border-2 border-black bg-cyan px-10 py-5 font-display text-xl text-dungeon shadow-[0_8px_0_#000] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_3px_0_#000]"
              >
                Post on X 𝕏
              </a>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={cardPath(score)}
                  download={`maze-of-gains-${score}-of-${TOTAL_QUESTIONS}.png`}
                  onClick={playSelect}
                  className="rounded-xl border-2 border-black bg-gold px-5 py-3 font-display text-sm text-dungeon"
                >
                  Save card
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="flex items-center justify-between border-t-2 border-black px-5 py-6 sm:px-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Maze of Gains · knowledge gauntlet
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-volt">
          ◆ 15 floors · 4 doors · 1 loot haul
        </span>
      </footer>
    </div>
  );
}
