import { ImageIcon, ArrowRight } from "lucide-react"

const newsItems = [
  {
    id: 1,
    category: "Update",
    categoryColor: "bg-accent text-accent-foreground",
    date: "02.24.2026",
    title: "Major Gameplay Systems Overhaul Complete",
    description: "Core combat mechanics have been refined based on community feedback from the last playtest...",
  },
  {
    id: 2,
    category: "Devlog",
    categoryColor: "bg-primary text-primary-foreground",
    date: "02.15.2026",
    title: "Behind the Scenes: Art Direction Deep Dive",
    description: "Our lead artist walks through the visual evolution of the game world...",
  },
  {
    id: 3,
    category: "Prototype",
    categoryColor: "bg-accent text-accent-foreground",
    date: "02.01.2026",
    title: "New Character Prototype Now Available",
    description: "Try out the latest character with unique abilities in our prototype build...",
  },
  {
    id: 4,
    category: "Milestone",
    categoryColor: "bg-primary text-primary-foreground",
    date: "01.20.2026",
    title: "Alpha Build v0.4 Released to Testers",
    description: "The latest alpha includes two new levels, improved AI, and performance fixes...",
  },
]

export function ProgressSection() {
  return (
    <section id="news" className="relative overflow-hidden bg-background py-16">
      {/* Diagonal stripe pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 10px, #a855f7 10px, #a855f7 11px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-10 grid grid-cols-1 gap-6 border-b-2 border-border pb-6 md:grid-cols-2">
          <h2
            className="text-5xl font-black uppercase tracking-tight text-foreground md:text-7xl"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            News
          </h2>
          <div className="flex items-end">
            <p className="text-lg font-bold text-foreground">
              Latest development updates
            </p>
          </div>
        </div>

        {/* News cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newsItems.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              {/* Card with gold border */}
              <div className="relative overflow-hidden border-2 border-primary/30 bg-card transition-all duration-300 hover:border-primary hover:shadow-lg">
                {/* Category badge */}
                <div className="absolute left-0 top-0 z-10">
                  <span
                    className={`inline-block px-4 py-1 text-[10px] font-bold uppercase tracking-widest ${item.categoryColor}`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Image placeholder */}
                <div className="relative aspect-[4/3] bg-secondary">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-10 w-10 opacity-30" />
                    <span className="text-xs font-medium">800 x 600</span>
                  </div>
                </div>

                {/* Gold bottom accent */}
                <div className="h-1 w-full bg-primary" />
              </div>

              {/* Info below card */}
              <div className="mt-3">
                <time className="text-sm font-bold text-accent">{item.date}</time>
                <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Read More link */}
        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="group/link flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
          >
            Read More
            <span className="h-px w-16 bg-foreground transition-all group-hover/link:w-20 group-hover/link:bg-primary" />
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
