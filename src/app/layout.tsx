import "./globals.css";
export const metadata = {
  title: "UniSwipe",
  description: "Swipe universities like Tinder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}