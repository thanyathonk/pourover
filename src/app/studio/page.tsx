import { AppShell } from "@/components/layout/AppShell";

type StudioPageProps = {
  searchParams?: Promise<{
    tab?: string;
    view?: string;
  }>;
};

export default async function StudioPage({ searchParams }: StudioPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const initialView =
    resolved?.view === "brewing" || resolved?.view === "blog" || resolved?.view === "config"
      ? resolved.view
      : "config";
  const initialTab =
    resolved?.tab === "four-six" || resolved?.tab === "standard" ? resolved.tab : "standard";

  return <AppShell initialView={initialView} initialTab={initialTab} />;
}
