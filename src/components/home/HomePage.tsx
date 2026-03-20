"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, SlidersHorizontal, Waves } from "lucide-react";
import { useState } from "react";
import {
  LocaleProvider,
  pickLocale,
  type AppLocale,
} from "@/components/i18n/LocaleProvider";
import { Card } from "@/components/ui/Card";

export function HomePage() {
  const [locale, setLocale] = useState<AppLocale>("en");
  const sections = [
    {
      href: "/studio?view=config",
      icon: SlidersHorizontal,
      title: pickLocale(locale, "Config", "ตั้งค่า"),
      body: pickLocale(
        locale,
        "Build a recipe from dripper, filter, roast, process, and ratio before brewing.",
        "ตั้งค่าสูตรจาก dripper, filter, roast, process และ ratio ก่อนเริ่มชง",
      ),
    },
    {
      href: "/studio?view=brewing",
      icon: Waves,
      title: pickLocale(locale, "Brewing", "ชงกาแฟ"),
      body: pickLocale(
        locale,
        "Run guided playback with stage timing, cumulative targets, and a live brewing scene.",
        "เริ่ม guided playback พร้อม timing, cumulative target และภาพการชงแบบสด",
      ),
    },
    {
      href: "/studio?view=blog",
      icon: BookOpen,
      title: pickLocale(locale, "Blog", "บทความ"),
      body: pickLocale(
        locale,
        "Read coffee notes about bloom, agitation, body, and clarity, then apply them back to setup.",
        "อ่านบทความเรื่อง bloom, agitation, body และ clarity แล้วนำกลับไปปรับสูตรต่อได้",
      ),
    },
  ];

  return (
    <LocaleProvider locale={locale}>
      <main className="mx-auto min-h-screen max-w-[1580px] px-6 py-8 xl:px-10">
        <div className="sticky top-3 z-30 mb-10 flex justify-center">
          <nav className="flex w-full max-w-[820px] items-center gap-1.5 rounded-full border border-white/10 bg-[#171b23]/54 px-2.5 py-1.5 shadow-[0_16px_48px_rgba(2,8,24,0.24)] backdrop-blur-xl">
            <Link
              href="/"
              aria-label={pickLocale(locale, "Go to homepage", "กลับหน้าแรก")}
              className="flex items-center rounded-full bg-white/92 p-1.5 text-slate-950 transition hover:scale-[1.02]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/6">
                <Image
                  src="/coffee-filter.png"
                  alt="Coffee filter"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </span>
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/studio"
                className="rounded-full border border-white/10 bg-white/6 px-3.5 py-1.5 text-[0.82rem] font-medium text-white/82 transition hover:bg-white/10 hover:text-white"
              >
                {pickLocale(locale, "Open Studio", "เข้า Studio")}
              </Link>
              <Link
                href="/studio?view=blog"
                className="rounded-full border border-white/10 bg-white/6 px-3.5 py-1.5 text-[0.82rem] font-medium text-white/82 transition hover:bg-white/10 hover:text-white"
              >
                {pickLocale(locale, "Coffee Blog", "Coffee Blog")}
              </Link>
              <div className="flex items-center rounded-full border border-white/10 bg-white/6 p-0.5">
                {(["en", "th"] as AppLocale[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLocale(lang)}
                    className={
                      locale === lang
                        ? "rounded-full bg-white/92 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-950"
                        : "rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/62 transition hover:text-white"
                    }
                  >
                    {lang === "en" ? "EN" : "TH"}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <section className="grid gap-10 xl:grid-cols-[minmax(500px,1fr)_minmax(620px,1.12fr)] xl:items-stretch">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-sky-200/55">
              {pickLocale(locale, "Pour-Over Knowledge Studio", "พื้นที่ความรู้เรื่องการดริปกาแฟ")}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {pickLocale(
                locale,
                "Learn pour-over logic, tune a recipe, and brew with intention.",
                "เรียนรู้ตรรกะของการดริป ปรับสูตรให้เหมาะ แล้วชงอย่างมีทิศทาง",
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">
              {pickLocale(
                locale,
                "This site combines coffee education, recipe configuration, and guided brewing playback so you can understand why a brew works before applying it in the real world.",
                "เว็บนี้รวมทั้งความรู้เรื่องกาแฟ การตั้งค่าสูตร และ guided brewing playback ไว้ด้วยกัน เพื่อให้เข้าใจว่าทำไมสูตรนั้นจึงได้ผลก่อนนำไปชงจริง",
              )}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/studio?view=config"
                className="inline-flex items-center gap-2 rounded-full border border-sky-300/24 bg-sky-400/14 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-400/20"
              >
                {pickLocale(locale, "Start With Config", "เริ่มที่หน้า Config")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/studio?view=brewing"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-5 py-3 text-sm font-medium text-white/82 transition hover:bg-white/10 hover:text-white"
              >
                {pickLocale(locale, "Open Brewing Scene", "เปิดหน้า Brewing")}
                <Waves className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {sections.map((item) => {
                const Icon = item.icon;

                return (
                  <Link key={item.title} href={item.href} className="block">
                    <Card className="h-full p-5 transition hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/8">
                      <Icon className="h-5 w-5 text-sky-200/78" />
                      <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-white/58">{item.body}</p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="xl:flex xl:justify-end xl:pl-8">
            <div className="relative mx-auto w-full max-w-[420px] min-h-[520px] overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,18,30,0.96),rgba(7,11,22,0.98))] p-3 shadow-[0_24px_80px_rgba(3,8,24,0.38)] sm:min-h-[600px] xl:h-full xl:min-h-[680px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,212,250,0.12),_transparent_38%)]" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-black/20 xl:h-full">
                <Image
                  src="/brewing.jpg"
                  alt={pickLocale(
                    locale,
                    "Pour-over coffee brewing scene",
                    "ภาพการดริปกาแฟ",
                  )}
                  fill
                  sizes="(min-width: 1280px) 420px, (min-width: 768px) 360px, 100vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </LocaleProvider>
  );
}
