import { ConfigProvider } from "antd";
import "./globals.css";
import { Inter } from "next/font/google"; // Frank_Ruhl_Libre, Mulish,
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthComp from "@/components/auth";

// export const frank_Ruhl_Libre = Frank_Ruhl_Libre({
//   weight: ["variable"],
//   style: ["normal"],
//   subsets: ["latin"],
//   variable: "--font-frank",
// });

export const inter = Inter({
  weight: ["variable"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-inter",
});

// export const mulish = Mulish({
//   weight: ["variable"],
//   style: ["normal"],
//   subsets: ["latin"],
//   variable: "--font-mulish",
// });

export const metadata = {
  title: "Arkadia",
  description: "Arkadia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ToastContainer />
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "var(--font-inter)",
            },
          }}
        >
          <StyledComponentsRegistry>
            <AuthComp />
            {children}
          </StyledComponentsRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
