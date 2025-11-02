import Image from "next/image";

export const Pricing = () => {
  return (
    <section className="container">
      <p>FLASH SALE DISCOUNT 20%</p>
      <h2>Daily price proxy</h2>
      <div>
        Pay only for the days you need, with no long-term commitments. Seamless
        browsing with IPs sourced globally through a decentralized network.
      </div>

      <div>
        <div>
          <h3>IPv6 Proxy</h3>
          <p>Gigabytes</p>
          <ul>
            <li>Supports HTTP/HTTPS</li>
            <li>Exports: 10,000 Ports Proxies</li>
            <li>Unlimited IP Rotations</li>
            <li>Unlimited Bandwidth</li>
            <li>Speed up to 50 Mbps</li>
          </ul>
          <div>$0.04</div>
        </div>
        <div>
          <h3>Rotation Residential</h3>
          <p>Day</p>
          <ul>
            <li>Supports HTTP/HTTPS</li>
            <li>IP Rotation: Every 10 Minutes</li>
            <li>Unlimited IP Rotations</li>
            <li>Unlimited Bandwidth</li>
            <li>Speed up to 50 Mbps</li>
          </ul>
          <div>$0.20</div>
        </div>

        <div>
          <h3>Static Residential</h3>
          <p>Day</p>
          <ul>
            <li>Supports HTTP/HTTPS</li>
            <li>IP Rotation: Every 10 Minutes</li>
            <li>Unlimited IP Rotations</li>
            <li>Unlimited Bandwidth</li>
            <li>Speed up to 50 Mbps</li>
          </ul>
          <div>$5</div>
        </div>
        <div>
          <h3>Unlimited Proxy</h3>
          <p>No Limited</p>
          <ul>
            <li>Supports HTTP/HTTPS</li>
            <li>Exports: 10,000 Ports Proxies</li>
            <li>Unlimited IP Rotations</li>
            <li>Unlimited Bandwidth</li>
            <li>Speed up to 50 Mbps</li>
          </ul>
          <div>$255</div>
        </div>
      </div>

      {/* Certificate */}
      <div>
        <div>
          <Image
            src="/images/pricing/certificates.png"
            alt="Certificate"
            width={1100}
            height={161}
          />
        </div>
        <div>Certified data centers and net providers</div>
      </div>
    </section>
  );
};
