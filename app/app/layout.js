
import "./globals.css";

export const metadata = {
  title: "English to Balochi Speech Translation",
  description:
    "An AI-powered system that translates English speech into Balochi speech using Whisper, mBART and OmniVoice.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
