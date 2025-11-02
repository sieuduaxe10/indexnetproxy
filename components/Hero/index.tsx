import { Button } from "../ui/button";

export const Hero = () => {
  return (
    <section className="container">
      <h1>
        Residential Proxies P2P <br />
        The best Proxy solution for MMO
      </h1>
      <p>
        With over 62 million proxy IPs across more than 220 countries and
        cities, we provide seamless, secure, and reliable proxy solutions for
        all your online needs.
      </p>
      <div>
        <Button size="lg" className="get-started-button">
          Get Started
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
