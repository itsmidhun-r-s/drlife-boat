import { Megaphone } from 'lucide-react';
import { ANNOUNCEMENTS } from '../../data/home';

/** Scrolling batch announcements. Pauses on hover/focus; static + scrollable for reduced motion. */
const AnnouncementBar = () => {
  const items = (hidden: boolean) =>
    ANNOUNCEMENTS.map((a) => (
      <li key={a.label + hidden} className="flex shrink-0 items-center gap-3 pr-10" aria-hidden={hidden || undefined}>
        <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink-950">
          {a.label}
        </span>
        <span className="whitespace-nowrap text-sm text-fg-soft">{a.text}</span>
      </li>
    ));

  return (
    <div className="theme-dark border-b border-line bg-bg" role="region" aria-label="Announcements">
      <div className="container-custom flex items-center gap-4 py-2.5">
        <Megaphone className="hidden h-4 w-4 shrink-0 text-accent sm:block" aria-hidden />
        <div className="group relative min-w-0 flex-1 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
          <ul className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
            {items(false)}
            {items(true)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
