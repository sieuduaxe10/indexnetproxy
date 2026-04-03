import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { mulish } from "@/app/fonts";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className={`${mulish.className} pt-[110px] 7xl:pt-[140px] pb-20 px-5 4xl:px-10`}>
        <div className="max-w-960 mx-auto">{children}</div>
      </div>
      <Footer />
    </>
  );
}
