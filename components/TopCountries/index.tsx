import Image from "next/image";
import { Separator } from "../ui/separator";

export const TopCountries = () => {
  const countries = [
    {
      name: "Vietnam",
      flag: "/images/flag/vietnam.png",
      ips: "981,177 IPs",
    },
    {
      name: "United States",
      flag: "/images/flag/american.svg",
      ips: "889,389 IPs",
    },
    {
      name: "India",
      flag: "/images/flag/india.png",
      ips: "889,389 IPs",
    },
    {
      name: "Brazil",
      flag: "/images/flag/brazil.svg",
      ips: "813,810 IPs",
    },
    {
      name: "Germany",
      flag: "/images/flag/germany.svg",
      ips: "767,098 IPs",
    },
    {
      name: "France",
      flag: "/images/flag/france.svg",
      ips: "645,901 IPs",
    },
    {
      name: "Canada",
      flag: "/images/flag/canada.svg",
      ips: "613,050 IPs",
    },
    {
      name: "Japan",
      flag: "/images/flag/japan.svg",
      ips: "591,729 IPs",
    },
    {
      name: "United Kingdom",
      flag: "/images/flag/united-kingdom.svg",
      ips: "588,309 IPs",
    },
    {
      name: "Australia",
      flag: "/images/flag/australia.svg",
      ips: "574,403 IPs",
    },
    {
      name: "South Korea",
      flag: "/images/flag/korean.svg",
      ips: "532,966 IPs",
    },
    {
      name: "Russia",
      flag: "/images/flag/russia.svg",
      ips: "400,849 IPs",
    },
  ];
  return (
    <section
      id="country"
      className="py-[60px] px-5 md:px-10 md:py-20 relative border-b border-[#e3ecec]"
    >
      <div className="absolute top-[18px] left-[75px]">
        <Image
          src={"/images/decor/orange-circle.png"}
          width={48}
          height={48}
          alt="Orange circle"
        />
      </div>

      <div className="absolute top-[132px] right-[77px]">
        <Image
          src={"/images/decor/blue-x.png"}
          width={30}
          height={30}
          alt="Orange circle"
        />
      </div>

      <div className="border-[#addeed] border-[6px] rounded-3xl p-5 md:p-10 flex flex-col min-[1200px]:flex-row gap-10 bg-[#00a7e6] container min-[1200px]items-center">
        <div className="text-[#fdfdfd]" style={{ flex: ".5 0 0" }}>
          <p className="text-13 font-inter font-medium">
            <strong>TOP LOCATIONS</strong>
          </p>
          <h3 className="text-2xl md:text-28 min-[1200px]:text-33 font-neue-kaine-bold leading-[120%]">
            Countries with the best proxy usage
          </h3>
          <p className="mt-5">
            Choose the best proxies in every city or country you ever heard of.
          </p>
        </div>

        <Separator
          orientation="vertical"
          className="bg-[#fdfdfd]! h-[191px]! hidden min-[1220px]:block"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 min-[1200px]:gap-9 flex-1 w-full">
          {countries.map((country) => (
            <div
              key={country.name}
              className="rounded-lg transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 relative rounded-full border-[#fdfdfd] border-2 overflow-hidden">
                  <Image
                    src={country.flag}
                    alt={`${country.name} flag`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="text-[#fdfdfd]">
                  <h4 className="opacity-60 text-13">{country.name}</h4>
                  <p className="text-17">{country.ips}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
