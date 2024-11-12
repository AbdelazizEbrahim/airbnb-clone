import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modal/Modal";
import RegisterModals from "./components/modal/RegisterModals";
import ToasterProvider from "./provider/ToasterProvider";

export const metadata = {
  title: "Airbnb clone",
  description: "Airbnb clone Ethiopia"
}

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className}`}
      >
        <ToasterProvider/>
        <RegisterModals/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
