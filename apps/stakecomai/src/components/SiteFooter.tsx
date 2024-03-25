import { Socials } from "~/components/Socials";

export function SiteFooter() {
  return (
    <header className="w-full border-b border-t border-border bg-muted/95 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-center gap-3">
        <p>© 2024 Stakecomai. All rights reserved.</p>
        <Socials />
      </div>
    </header>
  );
}
