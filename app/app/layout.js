import "./globals.css";

export const metadata = {
  title: "English to Balochi Speech Translation",
  description: "English speech to Balochi speech translation using AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
