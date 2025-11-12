import "@styles/globals.css";
import { Toaster } from "react-hot-toast";

import SessionProvider from "@components/Providers/SessionProvider";

export const metadata = {
  title: "3D models",
  description: "View and download free 3D models",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
