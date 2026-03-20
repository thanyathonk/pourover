"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, SlidersHorizontal, Waves } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CoffeeBlogApplyAction } from "@/data/blogPosts";
import {
  LocaleProvider,
  pickLocale,
  type AppLocale,
} from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";
import { useBrewCalculation } from "@/hooks/useBrewCalculation";
import { useBrewPlayback } from "@/hooks/useBrewPlayback";
import type { BrewInput, FourSixBrewInput, StandardBrewInput } from "@/types/brew";

const CenterPanel = dynamic(
  () => import("@/components/layout/CenterPanel").then((m) => ({ default: m.CenterPanel })),
  {
    loading: () => (
      <div className="flex min-h-[420px] animate-pulse items-center justify-center rounded-2xl border border-white/10 bg-white/3">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-sky-400/30 border-t-sky-300/60" />
      </div>
    ),
  },
);

/** Lazy-load blog: large tree + images; keeps /studio?view=config compiles lighter. */
const CoffeeBlogLibrary = dynamic(
  () =>
    import("@/components/blog/CoffeeBlogLibrary").then((m) => ({
      default: m.CoffeeBlogLibrary,
    })),
  {
    loading: () => (
      <div className="flex min-h-[480px] animate-pulse items-center justify-center rounded-2xl border border-white/10 bg-white/3">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-sky-400/30 border-t-sky-300/60" />
      </div>
    ),
  },
);

type TabId = "standard" | "four-six";
type WorkspaceView = "config" | "brewing" | "blog";

const DEFAULT_STANDARD: StandardBrewInput = {
  source: "standard",
  presetId: "v60-balanced-classic",
  dripper: "v60",
  filter: "hario-paper",
  brewMode: "hot",
  overrides: {},
};

const DEFAULT_FOUR_SIX: FourSixBrewInput = {
  source: "four-six",
  doseG: 20,
  roastLevel: "medium",
  tasteMode: "basic",
  bodyMode: "basic",
};

const WORKSPACE_NAV: Array<{
  id: WorkspaceView;
  label: string;
  icon: typeof SlidersHorizontal;
}> = [
  { id: "config", label: "Config", icon: SlidersHorizontal },
  { id: "brewing", label: "Brewing", icon: Waves },
  { id: "blog", label: "Blog", icon: BookOpen },
];

type AppShellProps = {
  initialTab?: TabId;
  initialView?: WorkspaceView;
};

export function AppShell({ initialTab = "standard", initialView = "config" }: AppShellProps) {
  const [locale, setLocale] = useState<AppLocale>("en");
  const [view, setView] = useState<WorkspaceView>(initialView);
  const [tab, setTab] = useState<TabId>(initialTab);
  const [standardInput, setStandardInput] = useState<StandardBrewInput>(DEFAULT_STANDARD);
  const [fourSixInput, setFourSixInput] = useState<FourSixBrewInput>(DEFAULT_FOUR_SIX);

  const input: BrewInput = tab === "standard" ? standardInput : fourSixInput;
  const { plan, error } = useBrewCalculation(input);
  const playback = useBrewPlayback(plan);

  const controls = useMemo(
    () => ({
      start: playback.start,
      pause: playback.pause,
      resume: playback.resume,
      reset: playback.reset,
    }),
    [playback.pause, playback.reset, playback.resume, playback.start],
  );

  const handleStandardChange = (next: StandardBrewInput) => {
    playback.reset();
    setStandardInput(next);
  };

  const handleFourSixChange = (next: FourSixBrewInput) => {
    playback.reset();
    setFourSixInput(next);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [view, tab]);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const applyBlogAction = (action: CoffeeBlogApplyAction) => {
    playback.reset();

    if (action.source === "standard") {
      setTab("standard");
      setStandardInput((prev) => ({
        ...prev,
        ...(action.patch ?? {}),
        source: "standard",
        overrides: {
          ...prev.overrides,
          ...(action.overrides ?? {}),
        },
      }));
    } else {
      setTab("four-six");
      setFourSixInput((prev) => ({
        ...prev,
        ...action.patch,
        source: "four-six",
      }));
    }

    setView("config");
  };

  const headerContent =
    view === "blog"
      ? {
          eyebrow: pickLocale(locale, "Pour-Over Knowledge Library", "คลังความรู้ Pour-Over"),
          title: pickLocale(
            locale,
            "Read articles, watch guides, and apply ideas back to your brew.",
            "อ่านบทความ ดูวิดีโอ และนำแนวคิดกลับไปใช้กับการชงได้ทันที",
          ),
          // description: pickLocale(
          //   locale,
          //   "Explore categorized pour-over articles and video guides about bloom, agitation, water, extraction, and recipe structure.",
          //   "สำรวจบทความและวิดีโอ pour-over แบบแยกหมวดหมู่ ทั้งเรื่อง bloom, agitation, น้ำ, การสกัด และโครงสร้างสูตรชง",
          // ),
        }
      : view === "brewing"
        ? {
            eyebrow: pickLocale(locale, "Pour-Over Brewing", "โหมดการชง Pour-Over"),
            title: pickLocale(
              locale,
              "Guided playback for a calmer brewing workflow.",
              "guided playback สำหรับการชงที่นิ่งและตามง่ายขึ้น",
            ),
            description: pickLocale(
              locale,
              "Run the active recipe through stage timing, cumulative targets, and the brewing scene.",
              "รันสูตรปัจจุบันผ่าน stage timing, cumulative target และภาพการชงแบบมีไกด์",
            ),
          }
        : {
            eyebrow: pickLocale(locale, "Pour-Over Brew Studio", "สตูดิโอวางแผนกาแฟดริป"),
            title: pickLocale(
              locale,
              "Calm, deterministic pour-over planning.",
              "วางแผนการชงแบบนิ่ง ชัด และคุมผลลัพธ์ได้",
            ),
            description: pickLocale(
              locale,
              "Use Standard Recipes or the 4:6 Method. Configure, then run guided playback.",
              "เลือกสูตรมาตรฐานหรือ 4:6 Method ปรับค่าที่ต้องการ แล้วเริ่ม playback การชงแบบมีไกด์",
            ),
          };

  return (
    <LocaleProvider locale={locale}>
    <main className="mx-auto min-h-screen max-w-[1580px] px-6 py-8 xl:px-10">
      <div className="sticky top-3 z-30 mb-8 flex justify-center">
        <nav className="flex w-full max-w-[760px] items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-[#171b23]/54 p-1 shadow-[0_14px_40px_rgba(2,8,24,0.18)] backdrop-blur-xl">
          <Link
            href="/"
            aria-label={pickLocale(locale, "Go to homepage", "กลับหน้าแรก")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/92 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition hover:scale-[1.02]"
          >
            <Image
              src="/coffee-filter.png"
              alt="Coffee filter"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          </Link>
          {WORKSPACE_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={cn(
                  "flex min-w-[104px] flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-left transition",
                  isActive
                    ? "bg-white/92 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                    : "text-white/70 hover:bg-white/7 hover:text-white",
                )}
              >
                <Icon className="h-3 w-3 shrink-0" />
                <span className="truncate text-[0.82rem] font-medium">
                  {pickLocale(
                    locale,
                    item.label,
                    item.id === "config"
                      ? "ตั้งค่า"
                      : item.id === "brewing"
                        ? "ชงกาแฟ"
                        : "บทความ",
                  )}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-sky-200/55">
            {headerContent.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
            {headerContent.title}
          </h1>
        </div>
        <div className="flex max-w-xl flex-col items-start gap-4 xl:items-end">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/6 p-1 backdrop-blur-xl">
            {(["en", "th"] as AppLocale[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLocale(lang)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition",
                  locale === lang
                    ? "bg-white/92 text-slate-950"
                    : "text-white/62 hover:text-white",
                )}
              >
                {lang === "en" ? "EN" : "TH"}
              </button>
            ))}
          </div>
          <p className="text-sm leading-7 text-white/58 xl:text-right">
            {headerContent.description}
          </p>
        </div>
      </div>

      {view !== "blog" ? (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTab("standard")}
            className={cn(
              "rounded-xl border px-4 py-2 text-sm font-medium transition",
              tab === "standard"
                ? "border-sky-400/40 bg-sky-500/15 text-white"
                : "border-white/10 bg-white/5 text-white/65 hover:bg-white/8",
            )}
          >
            {pickLocale(locale, "Standard Recipes", "สูตรมาตรฐาน")}
          </button>
          <button
            type="button"
            onClick={() => setTab("four-six")}
            className={cn(
              "rounded-xl border px-4 py-2 text-sm font-medium transition",
              tab === "four-six"
                ? "border-sky-400/40 bg-sky-500/15 text-white"
                : "border-white/10 bg-white/5 text-white/65 hover:bg-white/8",
            )}
          >
            4:6 Method
          </button>
        </div>
      ) : null}

      {view === "config" ? (
        <div className="grid gap-6 xl:grid-cols-[380px_minmax(520px,1fr)]">
          <div>
            <LeftPanel
              tab={tab}
              standardInput={standardInput}
              fourSixInput={fourSixInput}
              onStandardChange={handleStandardChange}
              onFourSixChange={handleFourSixChange}
            />
          </div>
          <div className="space-y-5">
            {plan ? (
              <RightPanel plan={plan} />
            ) : (
              <div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-rose-300/20 bg-rose-400/10 px-6 py-5 text-sm text-rose-100">
                {error}
              </div>
            )}
            <Card className="p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-sky-200/55">
                {pickLocale(locale, "Workspace Flow", "ลำดับการใช้งาน")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {pickLocale(
                  locale,
                  "Configure first, then move into brewing or reading.",
                  "เริ่มจากตั้งค่า แล้วค่อยไปหน้า Brewing หรือ Blog",
                )}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                {pickLocale(
                  locale,
                  "Use this page to tune the recipe, browse the current summary, and set the active method. When you are ready, jump to Brewing for guided playback or Blog for coffee notes that can feed directly back into the setup.",
                  "หน้านี้ใช้สำหรับปรับสูตร ดูสรุปสูตรปัจจุบัน และเลือกวิธีชงที่ต้องการ เมื่อพร้อมแล้วค่อยไปหน้า Brewing เพื่อเริ่มการชงแบบมีไกด์ หรือไปหน้า Blog เพื่ออ่านความรู้กาแฟแล้วนำกลับมาปรับ config ต่อได้",
                )}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setView("brewing")}
                  className="rounded-full border border-sky-300/24 bg-sky-400/12 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-400/18"
                >
                  {pickLocale(locale, "Go to Brewing", "ไปหน้า Brewing")}
                </button>
                <button
                  type="button"
                  onClick={() => setView("blog")}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2.5 text-sm font-medium text-white/78 transition hover:bg-white/10 hover:text-white"
                >
                  {pickLocale(locale, "Read Coffee Blog", "อ่าน Coffee Blog")}
                </button>
              </div>
            </Card>
          </div>
        </div>
      ) : null}

      {view === "brewing" ? (
        plan ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(580px,1fr)_380px]">
            <CenterPanel plan={plan} playback={playback} controls={controls} />
            <RightPanel plan={plan} />
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-rose-300/20 bg-rose-400/10 px-6 py-5 text-sm text-rose-100">
            {error}
          </div>
        )
      ) : null}

      {view === "blog" ? (
        <CoffeeBlogLibrary onApply={applyBlogAction} />
      ) : null}
    </main>
    </LocaleProvider>
  );
}
