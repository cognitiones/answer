import SideBar from "@/components/Sidebar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main flex">
            <SideBar />
            <section className="col note-viewer p-5">{children}</section>
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  );
}
