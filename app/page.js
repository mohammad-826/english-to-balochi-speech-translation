
"use client";

import { useState } from "react";
import { Client, handle_file } from "@gradio/client";

export default function Home() {
  const [audio, setAudio] = useState(null);
  const [english, setEnglish] = useState("");
  const [balochi, setBalochi] = useState("");
  const [resultAudio, setResultAudio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function translateAudio() {
    if (!audio) {
      setError("Please upload an English audio file.");
      return;
    }

    setLoading(true);
    setError("");
    setEnglish("");
    setBalochi("");
    setResultAudio("");

    try {
      const app = await Client.connect(
        "Muh340/english-to-balochi-speech"
      );

      const result = await app.predict(
        "/translate_speech",
        [handle_file(audio)]
      );

      setEnglish(result.data[0]);
      setBalochi(result.data[1]);

      const generatedAudio = result.data[2];

      setResultAudio(
        generatedAudio.url || generatedAudio.path || ""
      );

    } catch (err) {
      setError(
        "Translation failed. Please try again. " + err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-5 py-12">
      <div className="max-w-3xl mx-auto">

        <header className="text-center mb-12">
          <p className="text-cyan-400 font-semibold mb-3">
            ARTIFICIAL INTELLIGENCE PROJECT
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            English to Balochi
            <span className="text-cyan-400"> Speech Translation</span>
          </h1>

          <p className="text-slate-300 text-lg">
            Convert English speech into Balochi text and speech
            using Artificial Intelligence.
          </p>
        </header>

        <section className="bg-slate-900 border border-slate-700 rounded-2xl p-7 shadow-xl">

          <h2 className="text-2xl font-semibold mb-5">
            Upload English Audio
          </h2>

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-4 text-sm"
          />

          {audio && (
            <p className="text-cyan-300 mt-3 text-sm">
              Selected: {audio.name}
            </p>
          )}

          <button
            onClick={translateAudio}
            disabled={loading}
            className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold py-4 rounded-lg transition"
          >
            {loading ? "Processing Audio..." : "Translate into Balochi"}
          </button>

          {error && (
            <p className="text-red-400 mt-5">{error}</p>
          )}

        </section>

        {english && (
          <section className="mt-8 bg-slate-900 border border-slate-700 rounded-2xl p-7">
            <h2 className="text-xl font-semibold text-cyan-400 mb-3">
              Recognized English Text
            </h2>
            <p className="text-slate-200 leading-8">{english}</p>
          </section>
        )}

        {balochi && (
          <section className="mt-6 bg-slate-900 border border-slate-700 rounded-2xl p-7">
            <h2 className="text-xl font-semibold text-green-400 mb-3">
              Balochi Translation
            </h2>
            <p
              dir="rtl"
              className="text-2xl text-white leading-10"
            >
              {balochi}
            </p>
          </section>
        )}

        {resultAudio && (
          <section className="mt-6 bg-slate-900 border border-slate-700 rounded-2xl p-7">
            <h2 className="text-xl font-semibold text-purple-400 mb-4">
              Generated Balochi Speech
            </h2>

            <audio
              controls
              src={resultAudio}
              className="w-full"
            />
          </section>
        )}

        <footer className="text-center text-slate-500 mt-12 text-sm">
          <p>Developed by Muhammad and Ahmed</p>
          <p className="mt-2">
            Powered by Whisper, mBART and OmniVoice
          </p>
        </footer>

      </div>
    </main>
  );
}
