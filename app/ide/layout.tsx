import "../globals.css";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <body>
        <Providers>{children}</Providers>
      </body>
  );
}
