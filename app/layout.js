import { ConfigProvider } from "antd";
import "./globals.css";
import { Frank_Ruhl_Libre, Mulish } from "next/font/google";

const frank_Ruhl_Libre = Frank_Ruhl_Libre({
  weight: ["variable"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-frank-ruhl-libre",
});

const mulish = Mulish({
  weight: ["variable"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-mulish",
});

export const metadata = {
  title: "Arkadia",
  description: "Arkadia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${frank_Ruhl_Libre.className} ${mulish.className} `}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "var(--font-mulish)",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
