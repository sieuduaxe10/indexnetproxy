import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <section className="container">
      <div className="text-center font-sans">
        <h2 className="text-3xl font-semibold text-gray-900">
          Residential
          <span className="text-orange-500">Proxies P2P</span>
        </h2>
        <p className="mt-1 text-2xl text-gray-800">
          The best Proxy solution for
          <span className="text-cyan-500 font-medium">MMO</span>
        </p>
      </div>
      <p className="mx-auto text-[15px] leading-[25.5px] font-inter font-normal text-[rgb(87,96,117)] text-center break-words w-[768px] h-[51px] antialiased">
        With over 62 million proxy IPs across more than 220 countries and
        cities, we provide seamless, secure, and reliable proxy solutions for
        all your online needs.
      </p>
      <div>
        <Button size="lg" className="get-started-button">
          GET STARTED
        </Button>
        <Button variant={"outline"}>VIEW PRICE - AT $0.99</Button>
      </div>
      <div>
        <div>
          <div>Proxy Transparent</div>
          <p>
            A transparent proxy boosts security and enhances connection
            performance.
          </p>
        </div>

        <div>
          <div>No Logs Kept</div>
          <p>
            Our no-logs policy ensures privacy by not recording your activities,
            keeping your data secure and your browsing private.
          </p>
        </div>

        <div>
          <div>Fast Connection</div>
          <p>
            Enjoy lightning-fast speeds with our optimized proxy service.
            Reduced latency and improved response times provide seamless
            browsing, streaming, and smooth online performance.
          </p>
        </div>
      </div>
    </section>
  );
};
