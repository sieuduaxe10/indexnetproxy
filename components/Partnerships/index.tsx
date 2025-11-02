import { title } from "process";

export const Partnerships = () => {
  const partnerShips = [
    {
      title: "HIDDENCE.NET",
      link: "/affiliate-program",
    },
    {
      title: "GENLOGIN.COM",
      link: "/affiliate-program",
    },
    {
      title: "BITBROWSER.NET",
      link: "/affiliate-program",
    },

    {
      title: "SHOPSOCKS5.COM",
      link: "/affiliate-program",
    },

    {
      title: "BIGADS.VN",
      link: "/affiliate-program",
    },
    {
      title: "GEMLOGIN.VN",
      link: "/affiliate-program",
    },
    {
      title: "OMOCAPTCHA.COM",
      link: "/affiliate-program",
    },
    {
      title: "FARMREEL.ME",
      link: "/affiliate-program",
    },
    {
      title: "GENFARMER.COM",
      link: "/affiliate-program",
    },
    {
      title: "SMIT.VN",
      link: "/affiliate-program",
    },
    {
      title: "MULOGIN.COM",
      link: "/affiliate-program",
    },
    {
      title: "DOLPHIN-ANTY.COM",
      link: "/affiliate-program",
    },
    {
      title: "LS.APP",
      link: "/affiliate-program",
    },
    {
      title: "BROWSER.VISION",
      link: "/affiliate-program",
    },
    {
      title: "MORELOGIN.COM",
      link: "/affiliate-program",
    },
    {
      title: "XLOGIN.US",
      link: "/affiliate-program",
    },
    {
      title: "SHOPHPTOOLS.COM",
      link: "/affiliate-program",
    },
    {
      title: "FTIOS.COM",
      link: "/affiliate-program",
    },
    {
      title: "DICLOAK.COM",
      link: "/affiliate-program",
    },
    {
      title: "CORONIUM.IO",
      link: "/affiliate-program",
    },
    {
      title: "WPROXY.NET",
      link: "/affiliate-program",
    },
    {
      title: "TOPMMO.VN",
      link: "/affiliate-program",
    },
    {
      title: "INOTE.VN",
      link: "/affiliate-program",
    },
    {
      title: "MOBILEPROXY.SPACE",
      link: "/affiliate-program",
    },
    {
      title: "UMIX.VN",
      link: "/affiliate-program",
    },
    {
      title: "2PROXY.VN",
      link: "/affiliate-program",
    },
    {
      title: "GOMETA.VIP",
      link: "/affiliate-program",
    },
    {
      title: "HIEUDEV.COM",
      link: "/affiliate-program",
    },
    {
      title: "TOPPROXY.VN",
      link: "/affiliate-program",
    },
    {
      title: "BESUB.NET",
      link: "/affiliate-program",
    },
    {
      title: "HACKLIKE16.COM",
      link: "/affiliate-program",
    },
    {
      title: "ECOMKEY.ASIA",
      link: "/affiliate-program",
    },
    {
      title: "MUABANREF.COM",
      link: "/affiliate-program",
    },
    {
      title: "PROXYVN.VN",
      link: "/affiliate-program",
    },
    {
      title: "CYBERTIZ.IO",
      link: "/affiliate-program",
    },
    {
      title: "ACCVIA.COM",
      link: "/affiliate-program",
    },
    {
      title: "KHOVIA24H.COM",
      link: "/affiliate-program",
    },
    {
      title: "CHIENFB.COM",
      link: "/affiliate-program",
    },
    {
      title: "CLONE29.COM",
      link: "/affiliate-program",
    },
    {
      title: "VIMAIL.VN",
      link: "/affiliate-program",
    },
    {
      title: "VINANONWOVEN.COM",
      link: "/affiliate-program",
    },
    {
      title: "MINSOFTWARE.VN",
      link: "/affiliate-program",
    },
  ];
  return (
    <section className="container">
      <h3>Partnerships</h3>
      <ul className="center gap-2 flex-wrap">
        {partnerShips.map((partner, index) => (
          <li key={index}>
            <a href={partner.link}>{partner.title}</a>
          </li>
        ))}
      </ul>

      {/* Disclaimer */}
      <div>
        <p>
          Disclaimer: Users are responsible for lawful use of our proxy
          services. We are not liable for misuse. Thank you for your
          understanding!
        </p>
      </div>
    </section>
  );
};
