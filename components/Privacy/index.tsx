"use client";
import dynamic from "next/dynamic";
import PrivacyContent from "./PrivacyContent";

const PageTitleAnimate = dynamic(() => import("../PageTitleAnimate"), {
  ssr: false,
});

const Privacy = () => {
  return (
    <div>
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-min pt-[140px] px-5 pb-5 4xl:pt-[200px] 7xl:px-10 7xl:pb-10 bg-white flex-none">
        <PageTitleAnimate firstColorTitle="Privacy" secondColorTitle="Policy" />
        <div className="relative flex flex-col justify-start w-full max-w-600 h-auto flex-none whitespace-pre-wrap wrap-break-word outline-none">
          <h3 className="m-0 text-start tracking-normal no-underline"></h3>
          <strong className="text-[rgb(87, 96, 117)] decoration-[rgb(87, 96, 117)] font-neue-kaine-bold font-bold text-[18px] leading-[140%] text-center 4xl:text-[20px] 7xl:text-[21px]">
            Privacy Policy: Safeguarding Your Personal Data and Trust
          </strong>
        </div>
      </div>
      <section className="px-10 py-5 4xl:py-10 relative z-20 flex flex-col items-center justify-center w-full h-min p-10 flex-none overflow-visible">
        <div className="relative flex flex-col items-center justify-center flex-none w-full max-w-3xl h-min gap-10 p-0 overflow-visible">
          {/* class rte using to update style for rich text content */}
          <div className="rte relative flex flex-col justify-start flex-none w-[768px] h-auto whitespace-pre-wrap break-words outline-none">
            <PrivacyContent />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
