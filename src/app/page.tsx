export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4 px-6">
        <h1 className="text-5xl font-bold">
          Stop Overspending on AI Tools
        </h1>

        <p className="text-zinc-400 max-w-xl">
          Get an instant audit of your AI stack and discover
          where your startup can save money.
        </p>

        <button className="bg-white text-black px-6 py-3 rounded-xl font-medium">
          Start Free Audit
        </button>
      </div>
    </main>
  );
}