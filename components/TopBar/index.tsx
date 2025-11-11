import { inter } from "@/app/fonts";

export const TopBar = () => {
  return (
    <div className="bg-top-bar-orange-dark hidden 7xl:flex align-center justify-center w-full">
      <div className="mx-10 my-3 w-960">
        <p
          className={`${inter.className} text-[rgb(253,253,253)]  decoration-[rgb(253,253,253)] text-[13px] font-medium leading-[23.4px]`}
        >
          &nbsp;📌 Power Up Your Online Access—Residential Proxies Now Up to 20%
          Off!
        </p>
      </div>
    </div>
  );
};
