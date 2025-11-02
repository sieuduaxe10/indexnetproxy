import Image from "next/image";

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
    <section>
      <p>TOP LOCATIONS</p>
      <h3>Countries with the best proxy usage</h3>
      <p>Choose the best proxies in every city or country you ever heard of.</p>

      <div>
        {countries.map((country) => (
          <div key={country.name} className="border p-4 rounded-lg">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 relative">
                <Image
                  src={country.flag}
                  alt={`${country.name} flag`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <h4>{country.name}</h4>
                <p>{country.ips}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
