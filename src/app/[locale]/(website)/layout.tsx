import { InteractiveBackground } from "@/components/effects/interactive-background";
import { TopBar } from "@/components/layout/top-bar";
import { PanelContainer } from "@/components/layout/panel-container";
import { ScrollProvider } from "@/context/scroll-context";

export default function WebsiteLayout({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {
  return (
    <ScrollProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        <InteractiveBackground />
        <TopBar />

        <PanelContainer>
          {children}
        </PanelContainer>
      </div>
    </ScrollProvider>
  );
}
