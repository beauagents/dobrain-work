import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "DoBrain Work",
  description: "Replaceable frontend with a Vercel backend API"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
