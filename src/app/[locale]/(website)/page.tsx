import { getTranslations } from "next-intl/server";
import { InstallPanel } from "@/features/install/install-panel";
import { Button } from "@/components/ui/Button/button";
import {CommunityPanel} from "@/features/community/community-panel";
import {FeaturesPanel} from "@/features/features/features-panel";

type HomeStat = {
  value: string;
  label: string;
};

const Home = async () => {
  const t = await getTranslations("home");
  const navigation = await getTranslations("navigation");
  const stats = t.raw("stats") as HomeStat[];

  return (
    <main id="main" className="flex flex-1 flex-col">
      <section className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm shadow-blue-500/10 dark:text-blue-300">
              {t("eyebrow")}
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.06em] text-balance text-foreground sm:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {t("description")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full bg-blue-600 px-6 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500">
                <a href="#install">{t("primaryAction")}</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-blue-500/25 bg-background/60 px-6 hover:bg-blue-500/10">
                <a href="#features">{t("secondaryAction")}</a>
              </Button>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-border/80 bg-card/70 p-5 shadow-2xl shadow-blue-950/10 backdrop-blur-xl dark:shadow-blue-950/30">
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-transparent to-cyan-400/20 opacity-60" />
            <div className="relative overflow-hidden rounded-[1.55rem] border border-border/70 bg-background/85 p-6">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("previewLabel")}</p>
                  <p className="text-2xl font-semibold text-foreground">{t("labName")}</p>
                </div>
                <div className="rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                  {t("liveStatus")}
                </div>
              </div>
              <div className="grid gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border/70 bg-card/80 p-4">
                    <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InstallPanel />
      <FeaturesPanel />
      <CommunityPanel />
      <section id="faq" className="sr-only" aria-label={navigation("faq")} />
    </main>
  );
};

export default Home;
