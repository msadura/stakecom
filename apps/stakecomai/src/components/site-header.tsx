import { MainNav } from "~/components/main-nav";
import { MobileNav } from "~/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-muted/95 backdrop-blur supports-[backdrop-filter]:bg-muted/40">
      <div className="container flex h-16 max-w-screen-2xl items-center px-2 md:px-6">
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
}
