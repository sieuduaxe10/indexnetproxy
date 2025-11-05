import { Button } from "../ui/button";

export const Resellers = () => {
  return (
    <section className="relative px-5 py-[60px] md:px-10 md:py-20">
      <div className="container relative z-10">
        <div className="relative z-10 bg-primary border-[6px] border-[#f5c4a3] rounded-3xl p-10 max-w-960 mx-auto flex flex-col gap-5">
          <h3 className="text-center font-neue-kaine-bold text-2xl md:text-40 text-white max-w-[768px] mx-auto">
            Get Started with Netproxy.io Reseller Program
          </h3>
          <div className="center">
            <Button
              className="mx-auto! text-primary uppercase font-semibold px-8"
              variant={"secondary"}
            >
              Get Started
            </Button>
          </div>
          <p className="text-center text-[#fdfdfd] mx-auto max-w-600">
            The most cost-effective and risk-free way to start a proxy business,
            don&apos;t miss out on this opportunity.
          </p>
        </div>
      </div>

      <div className="bg-[#f2f7f7] h-[278px] absolute bottom-0 left-0 right-0 overflow-hidden"></div>
    </section>
  );
};
