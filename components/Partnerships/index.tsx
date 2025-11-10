import Image from "next/image";

export const Partnerships = () => {
  const partnerShips = [
    { title: "HIDDENCE.NET", url: "https://hiddence.net/" },
    { title: "GENLOGIN.COM", url: "https://genlogin.com/" },
    { title: "BITBROWSER.NET", url: "https://bitbrowser.net/?code=ef0218" },
    { title: "SHOPSOCKS5.COM", url: "https://shopsocks5.com/" },
    { title: "BIGADS.VN", url: "https://bigads.vn/" },
    { title: "GEMLOGIN.VN", url: "https://gemlogin.vn/" },
    { title: "OMOCAPTCHA.COM", url: "https://omocaptcha.com/" },
    { title: "FARMREEL.ME", url: "https://www.farmreel.me/" },
    { title: "GENFARMER.COM", url: "https://genfarmer.com/" },
    { title: "SMIT.VN", url: "http://smit.vn/" },
    { title: "MULOGIN.COM", url: "https://www.mulogin.com/" },
    { title: "DOLPHIN-ANTY.COM", url: "https://dolphin-anty.com/" },
    { title: "LS.APP", url: "https://ls.app/?utm_source=netproxy" },
    {
      title: "BROWSER.VISION",
      url: "https://browser.vision/en?utm_source=netproxy&utm_medium=partner&utm_campaign=promo&utm_content=link",
    },
    { title: "MORELOGIN.COM", url: "https://www.morelogin.com/" },
    { title: "XLOGIN.US", url: "https://xlogin.us/?sub=netproxy" },
    { title: "SHOPHPTOOLS.COM", url: "https://shophptools.com" },
    { title: "FTIOS.COM", url: "https://ftios.com/" },
    { title: "DICLOAK.COM", url: "https://dicloak.com/?utm_source=netproxyio" },
    { title: "CORONIUM.IO", url: "https://coronium.io/" },
    { title: "WPROXY.NET", url: "https://wproxy.net/" },
    { title: "TOPMMO.VN", url: "https://topmmo.vn/" },
    { title: "INOTE.VN", url: "https://inote.vn/" },
    { title: "MOBILEPROXY.SPACE", url: "https://mobileproxy.space/en/" },
    { title: "UMIX.VN", url: "https://umix.vn/" },
    { title: "2PROXY.VN", url: "https://2proxy.vn/" },
    { title: "GOMETA.VIP", url: "https://gometa.vip/" },
    { title: "HIEUDEV.COM", url: "https://hieudev.com/" },
    { title: "TOPPROXY.VN", url: "https://topproxy.vn/" },
    { title: "BESUB.NET", url: "https://besub.net/" },
    { title: "HACKLIKE16.COM", url: "https://hacklike16.com/" },
    { title: "ECOMKEY.ASIA", url: "https://ecomkey.asia/" },
    { title: "MUABANREF.COM", url: "https://muabanref.com/" },
    { title: "PROXYVN.VN", url: "https://proxyvn.vn/" },
    { title: "CYBERTIZ.IO", url: "https://cybertiz.io/" },
    { title: "ACCVIA.COM", url: "https://accvia.com/" },
    { title: "KHOVIA24H.COM", url: "https://khovia24h.com/" },
    { title: "CHIENFB.COM", url: "https://chienfb.com/" },
    { title: "CLONE29.COM", url: "https://clone29.com/" },
    { title: "VIMAIL.VN", url: "https://vimail.vn/" },
    { title: "VINANONWOVEN.COM", url: "https://vinanonwoven.com/" },
    { title: "MINSOFTWARE.VN", url: "https://minsoftware.vn/" },
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
                  <a href={partner.url}>{partner.title}</a>
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
