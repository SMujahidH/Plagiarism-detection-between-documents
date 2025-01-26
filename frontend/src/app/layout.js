'use client';

import "./globals.css";
export default function RootLayout({ children }) {

  return (
      <html lang="en" suppressHydrationWarning>
        <body className="bg-background">
            <main>{children}</main>
        </body>
      </html>
  );
}
