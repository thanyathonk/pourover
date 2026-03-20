"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  PlayCircle,
  Sparkles,
  X,
} from "lucide-react";
import {
  coffeeBlogCategories,
  coffeeBlogPosts,
  coffeeVideoGuides,
  type CoffeeBlogApplyAction,
  type CoffeeBlogCategoryId,
} from "@/data/blogPosts";
import { pickLocale, useLocale } from "@/components/i18n/LocaleProvider";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils/cn";

type CoffeeBlogLibraryProps = {
  onApply: (action: CoffeeBlogApplyAction) => void;
};

type ContentMode = "read" | "watch";

const ARTICLE_MEDIA_POSITIONS = [
  "object-[50%_28%]",
  "object-[58%_42%]",
  "object-[44%_58%]",
  "object-[50%_36%]",
  "object-[62%_48%]",
  "object-[40%_54%]",
];

export function CoffeeBlogLibrary({ onApply }: CoffeeBlogLibraryProps) {
  const locale = useLocale();
  const [mode, setMode] = useState<ContentMode>("read");
  const [activeCategoryId, setActiveCategoryId] = useState<"all" | CoffeeBlogCategoryId>("all");
  const [selectedPostId, setSelectedPostId] = useState(coffeeBlogPosts[0]?.id ?? "");
  const [selectedVideoId, setSelectedVideoId] = useState(coffeeVideoGuides[0]?.id ?? "");
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [videoQuery, setVideoQuery] = useState("");

  const filteredPosts = useMemo(
    () =>
      activeCategoryId === "all"
        ? coffeeBlogPosts
        : coffeeBlogPosts.filter((post) => post.categoryId === activeCategoryId),
    [activeCategoryId],
  );
  const filteredVideos = useMemo(
    () =>
      activeCategoryId === "all"
        ? coffeeVideoGuides
        : coffeeVideoGuides.filter((video) => video.categoryId === activeCategoryId),
    [activeCategoryId],
  );
  const visibleVideos = useMemo(() => {
    const query = videoQuery.trim().toLowerCase();

    if (!query) {
      return filteredVideos;
    }

    return filteredVideos.filter((video) => {
      const haystack = [video.title.en, video.title.th, video.creator, ...video.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [filteredVideos, videoQuery]);

  const activePost =
    filteredPosts.find((post) => post.id === selectedPostId) ?? filteredPosts[0];
  const activeVideo =
    visibleVideos.find((video) => video.id === selectedVideoId) ?? visibleVideos[0];

  const categoryCounts = useMemo(
    () =>
      coffeeBlogCategories.map((category) => ({
        ...category,
        count:
          mode === "read"
            ? coffeeBlogPosts.filter((post) => post.categoryId === category.id).length
            : coffeeVideoGuides.filter((video) => video.categoryId === category.id).length,
      })),
    [mode],
  );

  const itemCount = mode === "read" ? filteredPosts.length : visibleVideos.length;
  const hasContent = mode === "read" ? Boolean(activePost) : Boolean(activeVideo);

  useEffect(() => {
    if (!isArticleOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsArticleOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isArticleOpen]);

  if (!hasContent) return null;

  return (
    <div className="space-y-5">
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <SectionTitle eyebrow={pickLocale(locale, "Coffee Library", "คลังความรู้กาแฟ")}>
              {/* {pickLocale(locale, "Read And Watch In One Place", "อ่านและดูได้ในหน้าเดียว")} */}
            </SectionTitle>
            {/* <p className="mt-3 max-w-3xl text-sm leading-7 text-white/58">
              {pickLocale(
                locale,
                "Browse by topic, switch between article and video mode, and keep the detail pane open without scrolling through a long stacked page.",
                "เลือกดูตามหัวข้อ สลับระหว่างโหมดบทความกับวิดีโอ และอ่านรายละเอียดได้ใน pane เดียว โดยไม่ต้องเลื่อนหน้าลงยาว ๆ แบบเดิม",
              )}
            </p> */}
          </div>

          <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/6 p-1">
            {[
              {
                id: "read" as const,
                icon: BookOpen,
                label: pickLocale(locale, "Read", "อ่าน"),
              },
              {
                id: "watch" as const,
                icon: PlayCircle,
                label: pickLocale(locale, "Watch", "ดูวิดีโอ"),
              },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = mode === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMode(item.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-white/92 text-slate-950"
                      : "text-white/62 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <Card className="p-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-sky-200/55">
              {pickLocale(locale, "Topic Filter", "ตัวกรองหัวข้อ")}
            </p>
            <p className="mt-2 text-sm leading-7 text-white/56">
              {pickLocale(
                locale,
                mode === "read"
                  ? "Choose a pour-over topic, then read the article on the right."
                  : "Choose a pour-over topic, then watch the video on the right.",
                mode === "read"
                  ? "เลือกหัวข้อที่สนใจ แล้วอ่านบทความทางด้านขวา"
                  : "เลือกหัวข้อที่สนใจ แล้วดูวิดีโอทางด้านขวา",
              )}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategoryId("all")}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition",
                  activeCategoryId === "all"
                    ? "border-sky-300/24 bg-sky-400/12 text-white"
                    : "border-white/10 bg-white/6 text-white/52 hover:text-white",
                )}
              >
                {pickLocale(locale, "All Topics", "ทุกหมวด")} ·{" "}
                {mode === "read" ? coffeeBlogPosts.length : coffeeVideoGuides.length}
              </button>

              {categoryCounts.map((category) => {
                const isActive = activeCategoryId === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategoryId(category.id)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition",
                      isActive
                        ? "border-sky-300/24 bg-sky-400/12 text-white"
                        : "border-white/10 bg-white/6 text-white/52 hover:text-white",
                    )}
                  >
                    {category.label[locale]} · {category.count}
                  </button>
                );
              })}
            </div>
          </Card>

          {mode === "watch" ? (
            <>
              <Card className="p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                  {pickLocale(locale, "Video Search", "ค้นหาวิดีโอ")}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/56">
                  {pickLocale(
                    locale,
                    "Find a video quickly by title, creator, or tag, then keep the player pinned on the right.",
                    "ค้นหาวิดีโอด้วยชื่อ ผู้สอน หรือแท็ก แล้วคงตัวเล่นไว้ทางขวาเพื่อดูต่อได้ทันที",
                  )}
                </p>
                <input
                  value={videoQuery}
                  onChange={(event) => setVideoQuery(event.target.value)}
                  placeholder={pickLocale(locale, "Search videos", "ค้นหาวิดีโอ")}
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none placeholder:text-white/28 focus:border-sky-300/24 focus:bg-white/8"
                />
              </Card>

              <Card className="p-3">
                <div className="mb-3 flex items-center justify-between px-2 pt-1">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                    {pickLocale(locale, "Video List", "รายการวิดีโอ")}
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/32">
                    {itemCount}
                  </span>
                </div>

                <div className="max-h-[58vh] space-y-2 overflow-y-auto pr-1">
                  {visibleVideos.map((video, index) => {
                    const isActive = video.id === activeVideo?.id;
                    const mediaPosition =
                      ARTICLE_MEDIA_POSITIONS[index % ARTICLE_MEDIA_POSITIONS.length];

                    return (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => setSelectedVideoId(video.id)}
                        className={cn(
                          "w-full rounded-[20px] border p-2.5 text-left transition",
                          isActive
                            ? "border-sky-300/28 bg-sky-400/10"
                            : "border-white/8 bg-white/4 hover:bg-white/7",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-[72px] w-[96px] shrink-0 overflow-hidden rounded-[14px] border border-white/8 bg-black/20">
                            <Image
                              src="/brewing.jpg"
                              alt={video.title[locale]}
                              fill
                              sizes="96px"
                              className={cn("object-cover", mediaPosition)}
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.04),rgba(7,17,31,0.24))]" />
                            <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/58 text-white">
                              <PlayCircle className="h-4 w-4" />
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] uppercase tracking-[0.2em] text-sky-200/46">
                              {video.creator}
                            </p>
                            <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-white">
                              {video.title[locale]}
                            </h3>
                            <p className="mt-1 text-[0.78rem] text-white/36">YouTube</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {visibleVideos.length === 0 ? (
                    <div className="rounded-[20px] border border-white/8 bg-white/4 px-4 py-6 text-sm text-white/48">
                      {pickLocale(
                        locale,
                        "No videos match this search yet.",
                        "ยังไม่พบวิดีโอที่ตรงกับคำค้นนี้",
                      )}
                    </div>
                  ) : null}
                </div>
              </Card>
            </>
          ) : null}
        </div>

        {mode === "read" ? (
          <div className="space-y-4">
            {/* <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                {pickLocale(locale, "Article List", "รายการบทความ")}
              </p>
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/32">
                {itemCount}
              </span>
            </div> */}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post, index) => {
                const category = coffeeBlogCategories.find((item) => item.id === post.categoryId);
                const mediaPosition =
                  ARTICLE_MEDIA_POSITIONS[index % ARTICLE_MEDIA_POSITIONS.length];

                return (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setIsArticleOpen(true);
                    }}
                    className="text-left"
                  >
                    <Card className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/4 p-2.5 transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/7">
                      <div className="relative overflow-hidden rounded-[18px] border border-white/8 bg-black/20">
                        <div className="relative aspect-[1.26]">
                          <Image
                            src="/brewing.jpg"
                            alt={post.title[locale]}
                            fill
                            sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
                            className={cn(
                              "object-cover transition duration-500 group-hover:scale-[1.03]",
                              mediaPosition,
                            )}
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.06),rgba(7,17,31,0.28))]" />
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3">
                        <div className="flex items-center gap-2 text-[0.82rem] text-white/46">
                          <span>{pickLocale(locale, "Pour-Over Brew", "Pour-Over Brew")}</span>
                          <span>•</span>
                          <span>{post.readTime[locale]}</span>
                        </div>

                        <div className="mt-3 flex items-start justify-between gap-4">
                          <h3 className="max-w-[16ch] text-lg font-semibold leading-7 text-white">
                            {post.title[locale]}
                          </h3>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/62 transition group-hover:bg-white/12 group-hover:text-white">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>

                        <div className="mt-auto flex items-center gap-3 pt-4">
                          {category ? (
                            <span className="rounded-full border border-sky-300/18 bg-sky-400/10 px-2.5 py-1 text-[0.72rem] font-medium text-sky-100/88">
                              {category.label[locale]}
                            </span>
                          ) : null}
                          <span className="text-[0.82rem] text-white/38">Mar 20, 2026</span>
                        </div>
                      </div>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {mode === "watch" && activeVideo ? (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-sky-200/50">
                    {activeVideo.eyebrow[locale]}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {activeVideo.title[locale]}
                  </h2>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/34">
                    {activeVideo.creator}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/56">
                    {activeVideo.summary[locale]}
                  </p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-black/30">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.videoId}`}
                    title={activeVideo.title[locale]}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/4 p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                  {pickLocale(locale, "Method Summary", "สรุปวิธีจากวิดีโอ")}
                </p>
                <div className="mt-4 space-y-3">
                  {activeVideo.method[locale].map((step) => (
                    <p key={step} className="text-sm leading-7 text-white/72">
                      {step}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {activeVideo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-white/54"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-sm leading-6 text-white/58">
                  {pickLocale(
                    locale,
                    "Open the original clip if you want the full pacing, visual detail, and spoken explanation.",
                    "กดเปิดคลิปต้นฉบับได้ หากต้องการดูจังหวะจริง ภาพเต็ม และคำอธิบายจากผู้สอนโดยตรง",
                  )}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={activeVideo.watchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-300/24 bg-sky-400/12 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-400/18"
                  >
                    {pickLocale(locale, "Watch Original Video", "ดูวิดีโอต้นฉบับ")}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={activeVideo.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-white/82 transition hover:bg-white/10 hover:text-white"
                  >
                    {pickLocale(locale, "Open Reference", "เปิดแหล่งอ้างอิง")}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        ) : null}
      </div>

      {mode === "read" && activePost && isArticleOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/72 px-4 py-6 backdrop-blur-md"
          onClick={() => setIsArticleOpen(false)}
        >
          <Card
            className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto p-6 sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label={pickLocale(locale, "Close article", "ปิดบทความ")}
              onClick={() => setIsArticleOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/72 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 pr-14 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-sky-200/50">
                  {activePost.eyebrow[locale]}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  {activePost.title[locale]}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/56">
                  {activePost.summary[locale]}
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/54">
                {activePost.readTime[locale]}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {activePost.sections[locale].map((section) => (
                <p key={section} className="text-sm leading-7 text-white/72">
                  {section}
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-sky-300/18 bg-sky-400/10 p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-950">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-sky-100/62">
                    {pickLocale(locale, "Takeaway", "ข้อสรุปสำคัญ")}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-sky-50/92">
                    {activePost.takeaway[locale]}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/4 p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                {pickLocale(locale, "Sources", "แหล่งอ้างอิง")}
              </p>
              <p className="mt-2 text-sm leading-7 text-white/56">
                {pickLocale(
                  locale,
                  "This post is synthesized from the following sources.",
                  "บทความนี้สังเคราะห์จากแหล่งข้อมูลต่อไปนี้",
                )}
              </p>
              <div className="mt-4 space-y-3">
                {activePost.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/72 transition hover:bg-white/8 hover:text-white"
                  >
                    <span>{source.label}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-white/42" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-white/58">
                {activePost.apply.description[locale]}
              </p>
              <button
                type="button"
                onClick={() => onApply(activePost.apply)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-300/24 bg-sky-400/12 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-400/18"
              >
                {activePost.apply.label[locale]}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
