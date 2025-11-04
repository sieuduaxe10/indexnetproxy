import Image from "next/image";

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

  const disclaimerPartner = [
    "/images/disclaimer/9pay.png",
    "/images/disclaimer/uob.png",
    "/images/disclaimer/bank-of-china.png",
    "/images/disclaimer/mizuho.png",
    "/images/disclaimer/bitcoin.png",
    "/images/disclaimer/visa.png",
    "/images/disclaimer/tazapay.png",
    "/images/disclaimer/mastercard.png",
    "/images/disclaimer/bidv.png",
    "/images/disclaimer/paypal.png",
    "/images/disclaimer/mbbank.png",
    "/images/disclaimer/true-money.png",
    "/images/disclaimer/shopee-pay.png",
    "/images/disclaimer/line-pay.png",
    "/images/disclaimer/alipay.svg",
    "/images/disclaimer/link-aja.png",
    "/images/disclaimer/dana.png",
    "/images/disclaimer/grab-pay.png",
  ];

  return (
    <section className="bg-footer-background">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[270px] z-0 bottom-0">
          <Image
            src={"/images/disclaimer/background.png"}
            alt={"Disclaimer background"}
            objectFit="cover"
            fill
          />
        </div>
        <div className="px-4 md:px-10 py-[30px] relative">
          <div className="container flex flex-col gap-6">
            <h3 className="font-neue-kaine-bold text-xl underline text-white hover:text-blue-500 cursor-pointer">
              Partnerships
            </h3>
            <ul className="center flex-wrap">
              {partnerShips.map((partner, index) => (
                <li
                  key={index}
                  className="text-[#fc833d] hover:underline pr-6 text-13"
                >
                  <a href={partner.link}>{partner.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="px-4 md:px-10 py-[30px] text-white relative">
        <div className="container flex flex-row">
          <p className="text-13">
            Disclaimer: Users are responsible for lawful use of our proxy
            services. We are not liable for misuse. Thank you for your
            understanding!
          </p>
          <div className="flex gap-2 flex-row flex-wrap">
            {disclaimerPartner.map((imgSrc, index) => (
              <div
                key={index}
                className="w-[55px] h-[22px] bg-white rounded-xl flex items-center justify-center overflow-hidden"
              >
                <Image
                  width={40}
                  height={20}
                  objectFit="contain"
                  src={imgSrc}
                  alt={`Disclaimer ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
