export default function About() {
    return (
        <main className="bg-secondary text-white">
            {/* Hero */}
            <section className="relative overflow-hidden">
                {/* soft accents */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />

                <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 sm:pt-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs sm:text-sm">
            ♠️ Pocket Poker Pal
            <span className="h-1 w-1 rounded-full bg-primary" />
            Instant poker rulings
          </span>

                    <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                        Your poker rules assistant—<span className="text-primary">fast, accurate</span>, and voice‑powered.
                    </h1>

                    <p className="mt-3 sm:mt-4 text-gray-300 max-w-3xl">
                        Get rulebook‑backed answers in the moment—on the floor, in training, or at the table.
                    </p>
                </div>
            </section>

            {/* Core value */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 mt-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2">🎙 Speak or Type Your Question</h2>
                    <p className="text-gray-300">
                        Use your voice or keyboard—Pocket Poker Pal listens, understands, and responds instantly.
                    </p>
                </div>
            </section>

            {/* Backed by rulebooks */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 mt-8">
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">📚 Backed by Official Rulebooks</h3>
                        <p className="text-gray-300">
                            Embedded sources include TDA Poker Rules and the Seminole Poker Rule Book, so every response is grounded
                            in professional standards.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">💡 Why it’s reliable</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Answers cite rulebook language where applicable</li>
                            <li>Built for quick rulings in real‑world situations</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Audiences */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 mt-8">
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">👨‍💼 For Industry Pros</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Floor Staff & Dealers: Resolve disputes quickly and confidently</li>
                            <li>Supervisors & Trainers: Use as a teaching aid for new hires</li>
                            <li>Tournament Directors: Reference rulings without flipping pages</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">🧠 For Players</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Learn advanced rulings used in casino and tournament settings</li>
                            <li>Understand the reasoning behind floor decisions to improve play</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Features grid */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 mt-8 mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">💡 Features You’ll Love</h2>
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[
                        { icon: "💬", title: "Conversational Chat", desc: "Natural answers with clear context." },
                        { icon: "🤖", title: "Rulebook‑Grounded", desc: "Responses based on trusted sources." },
                        { icon: "🎙", title: "Voice Input", desc: "Hands‑free use during live situations." },
                        { icon: "⚡", title: "Fast & Accurate", desc: "Optimized for on‑the‑floor rulings." },
                        { icon: "📱", title: "Mobile‑First", desc: "Clean UI that shines on phones." },
                        { icon: "🔎", title: "Searchable", desc: "Find rulings by topic or keyword." },
                    ].map((f) => (
                        <div
                            key={f.title}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition"
                        >
                            <div className="text-2xl">{f.icon}</div>
                            <h4 className="mt-2 font-semibold">{f.title}</h4>
                            <p className="text-gray-300 text-sm mt-1">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                    <a
                        href="/chat"
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 font-semibold text-black hover:brightness-110 transition"
                    >
                        Ask a Question
                    </a>
                    <a
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10 transition"
                    >
                        Back to Home
                    </a>
                </div>
            </section>
        </main>
    );
}
