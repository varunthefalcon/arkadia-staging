import { ConfigProvider } from "antd";
import "./globals.css";
import { Frank_Ruhl_Libre, Mulish } from "next/font/google";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthComp from "@/components/auth";

const frank_Ruhl_Libre = Frank_Ruhl_Libre({
  weight: ["variable"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-frank",
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
        <ToastContainer />
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "var(--font-mulish)",
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
