"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button/button";

type OperatingSystem = "windows" | "linux" | "macos";
type GraphicsApi = "vulkan" | "opengl";

type InstallOption<TValue extends string> = {
  value: TValue;
  image: string;
  labelKey: string;
};

const operatingSystems = [
  { value: "windows", image: "/images/Windows-Logo.svg", labelKey: "windows" },
  { value: "linux", image: "/images/Linux-Logo.svg", labelKey: "linux" },
  { value: "macos", image: "/images/Apple-Logo.svg", labelKey: "macos" },
] as const satisfies readonly InstallOption<OperatingSystem>[];

const graphicsApis = [
  { value: "vulkan", image: "/images/Vulkan-Logo.svg", labelKey: "vulkan" },
  { value: "opengl", image: "/images/OpenGL-Logo.svg", labelKey: "opengl" },
] as const satisfies readonly InstallOption<GraphicsApi>[];

const stepKeys = ["os", "graphics", "download"] as const;

export const InstallPanel = () => {
  const t = useTranslations("installPanel");
  const [selectedOs, setSelectedOs] = useState<OperatingSystem | null>(null);
  const [selectedGraphicsApi, setSelectedGraphicsApi] = useState<GraphicsApi | null>(null);

  const selectedOsOption = operatingSystems.find((option) => option.value === selectedOs);
  const selectedGraphicsApiOption = graphicsApis.find((option) => option.value === selectedGraphicsApi);
  const currentStep = selectedOs === null ? "os" : selectedGraphicsApi === null ? "graphics" : "download";

  const downloadFileName = useMemo(() => {
    if (selectedOs === null || selectedGraphicsApi === null) {
      return "";
    }

    return `coreverse-engine-${selectedOs}-${selectedGraphicsApi}.txt`;
  }, [selectedGraphicsApi, selectedOs]);

  const handleDownload = () => {
    if (selectedOs === null || selectedGraphicsApi === null) {
      return;
    }

    const fileContent = [
      "Coreverse Engine installer placeholder",
      `Operating system: ${selectedOs}`,
      `Graphics API: ${selectedGraphicsApi}`,
      "Real installer binaries will replace this text file later.",
    ].join("\n");
    const file = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = downloadFileName;
    link.click();
    URL.revokeObjectURL(fileUrl);
  };

  const handleBack = () => {
    if (selectedGraphicsApi !== null) {
      setSelectedGraphicsApi(null);
      return;
    }

    setSelectedOs(null);
  };

  return (
    <section id="install" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24" aria-labelledby="install-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/70 p-5 shadow-2xl shadow-blue-950/10 backdrop-blur-xl dark:shadow-blue-950/30">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="grid gap-8 rounded-[1.5rem] border border-border/70 bg-background/80 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm shadow-blue-500/10 dark:text-blue-300">
              {t("eyebrow")}
            </div>
            <h2 id="install-title" className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">{t("description")}</p>

            <div className="mt-8 grid gap-3">
              {stepKeys.map((stepKey, index) => {
                const isActive = currentStep === stepKey;
                const isDone =
                  (stepKey === "os" && selectedOs !== null) ||
                  (stepKey === "graphics" && selectedGraphicsApi !== null) ||
                  (stepKey === "download" && currentStep === "download");

                return (
                  <div
                    key={stepKey}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 p-3"
                    data-active={isActive}
                  >
                    <span
                      data-active={isActive}
                      className="flex size-8 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                    >
                      {isDone ? "✓" : index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t(`steps.${stepKey}.title`)}</p>
                      <p className="text-xs text-muted-foreground">{t(`steps.${stepKey}.description`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-border/70 bg-card/80 p-4 sm:p-5">
            {currentStep === "os" ? (
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t("osTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("osDescription")}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {operatingSystems.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className="group rounded-3xl border border-border/70 bg-background/70 p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/10"
                      onClick={() => setSelectedOs(option.value)}
                    >
                      <span className="flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                        <Image src={option.image} alt="" width={42} height={42} />
                      </span>
                      <span className="mt-4 block text-base font-semibold text-foreground">{t(`options.${option.labelKey}`)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {currentStep === "graphics" ? (
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t("graphicsTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("graphicsDescription")}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {graphicsApis.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className="group rounded-3xl border border-border/70 bg-background/70 p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/10"
                      onClick={() => setSelectedGraphicsApi(option.value)}
                    >
                      <span className="flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                        <Image src={option.image} alt="" width={46} height={46} />
                      </span>
                      <span className="mt-4 block text-base font-semibold text-foreground">{t(`options.${option.labelKey}`)}</span>
                    </button>
                  ))}
                </div>
                <Button type="button" variant="ghost" className="mt-5 rounded-full px-4" onClick={handleBack}>
                  {t("back")}
                </Button>
              </div>
            ) : null}

            {currentStep === "download" && selectedOsOption !== undefined && selectedGraphicsApiOption !== undefined ? (
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t("downloadTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("downloadDescription")}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-border/70 bg-background/70 p-5">
                    <span className="flex size-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                      <Image src={selectedOsOption.image} alt="" width={38} height={38} />
                    </span>
                    <p className="mt-4 text-sm text-muted-foreground">{t("selectedOs")}</p>
                    <p className="text-base font-semibold text-foreground">{t(`options.${selectedOsOption.labelKey}`)}</p>
                  </div>
                  <div className="rounded-3xl border border-border/70 bg-background/70 p-5">
                    <span className="flex size-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
                      <Image src={selectedGraphicsApiOption.image} alt="" width={40} height={40} />
                    </span>
                    <p className="mt-4 text-sm text-muted-foreground">{t("selectedGraphics")}</p>
                    <p className="text-base font-semibold text-foreground">{t(`options.${selectedGraphicsApiOption.labelKey}`)}</p>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-700 dark:text-blue-200">
                  {downloadFileName}
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button type="button" size="lg" className="h-12 rounded-full bg-blue-600 px-6 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500" onClick={handleDownload}>
                    {t("downloadAction")}
                  </Button>
                  <Button type="button" variant="outline" size="lg" className="h-12 rounded-full border-blue-500/25 bg-background/60 px-6 hover:bg-blue-500/10" onClick={handleBack}>
                    {t("back")}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
