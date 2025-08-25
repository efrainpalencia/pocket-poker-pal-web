import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import PPPHero from "../assets/ppp-hero.jpeg";

export default function Home() {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-secondary">
            {/* Centered content container */}
            <section
                aria-labelledby="hero-title"
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
            >
                {/* Responsive two-column grid */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
                    {/* Copy column */}
                    <div className="lg:col-span-7">
                        <h1
                            id="hero-title"
                            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary"
                        >
                            Get in‑context answers to poker gameplay rules.
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed">
                            Have a poker rules question? Ask <span className="font-semibold text-primary">Pocket Poker Pal</span>,
                            your AI‑powered assistant trained on industry‑standard rules and best practices.
                        </p>

                        {/* CTA buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => navigate("/chat")}
                                className="w-full sm:w-auto"
                            >
                                Open Chat
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate("/about")}
                                className="w-full sm:w-auto"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>

                    {/* Image column */}
                    <div className="lg:col-span-5">
                        <figure className="mx-auto max-w-md sm:max-w-lg lg:max-w-none">
                            <img
                                src={PPPHero}
                                alt="Pocket Poker Pal—AI assistant helping players with poker rules"
                                loading="lazy"
                                decoding="async"
                                className="
                  block w-full h-auto
                  rounded-2xl shadow-2xl
                  ring-1 ring-black/10
                  object-cover
                "
                                /* If you're using a responsive image plugin, add a sizes prop */
                                /* sizes="(min-width: 1024px) 480px, (min-width: 640px) 60vw, 90vw" */
                            />
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
