import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import PPPHero from "../assets/ppp-hero.jpeg";

export default function Home() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-secondary text-white relative overflow-hidden">
            {/* soft background accents */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />

            <section
                aria-labelledby="hero-title"
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
            >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
                    {/* Copy column */}
                    <div className="lg:col-span-7">
                        {/* small badge */}
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs sm:text-sm">
              ♠️ Pocket Poker Pal
              <span className="h-1 w-1 rounded-full bg-primary" />
              Instant rulings
            </span>

                        <h1
                            id="hero-title"
                            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
                        >
                            Get in‑context answers to{" "}
                            <span className="text-primary">poker gameplay rules</span>.
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-prose">
                            Have a poker rules question? Ask{" "}
                            <span className="font-semibold text-primary">Pocket Poker Pal</span>,
                            your AI‑powered assistant trained on industry‑standard rulebooks and best practices.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => navigate("/chat")}
                                className="w-full sm:w-auto"
                                aria-label="Open chat"
                            >
                                Open Chat
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate("/about")}
                                className="w-full sm:w-auto"
                                aria-label="Learn more about Pocket Poker Pal"
                            >
                                Learn More
                            </Button>

                            {/* trust microcopy */}
                            <span className="text-xs text-white/70 sm:ml-2">
                No sign‑up required
              </span>
                        </div>

                        {/* quick benefits row */}
                        <ul className="mt-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 text-sm text-white/80">
                            <li className="flex items-center gap-2">
                                <span aria-hidden>⚡</span> Fast, rulebook‑grounded answers
                            </li>
                            <li className="flex items-center gap-2">
                                <span aria-hidden>🎙</span> Voice or text input
                            </li>
                            <li className="flex items-center gap-2">
                                <span aria-hidden>📱</span> Mobile‑first design
                            </li>
                            <li className="flex items-center gap-2">
                                <span aria-hidden>🔎</span> Search by topic
                            </li>
                        </ul>
                    </div>

                    {/* Image column */}
                    <div className="lg:col-span-5">
                        <figure className="mx-auto max-w-md sm:max-w-lg lg:max-w-none">
                            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                                <img
                                    src={PPPHero}
                                    alt="Pocket Poker Pal—AI assistant helping with poker rulings"
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 h-full w-full object-cover"
                                    /* sizes="(min-width:1024px) 520px, (min-width:640px) 70vw, 90vw" */
                                />
                                {/* subtle gradient overlay for text contrast if used as background */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                            <figcaption className="sr-only">
                                AI assistant for poker rules questions
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>
        </main>
    );
}
