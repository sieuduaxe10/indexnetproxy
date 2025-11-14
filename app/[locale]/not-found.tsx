import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-auto bg-white flex flex-col items-center gap-0 h-[550px] p-0 relative overflow-hidden">
      <div className="flex flex-col flex-[1_0_0] items-center justify-center gap-[30px] w-full h-px py-[100px] px-5 relative overflow-visible">
        <div className="w-auto h-auto relative overflow-visible flex flex-col justify-start outline-none">
          <h1 className="font-inter font-bold text-[154px] 4xl:text-[260px] leading-[1em] tracking-[-11.6px] 4xl:tracking-[-20.6px] 7xl:tracking-[-19.6px] text-[rgb(0,17,34)] text-start">
            404
          </h1>
        </div>

        <div className="relative flex flex-col justify-start overflow-visible w-auto h-auto outline-none max-w-[300px] 4xl:max-w-[500px] 7xl:max-w-600">
          <p className="font-inter font-medium text-[18px] leading-[1.5em] tracking-[-0.7px] text-[#888888] text-center whitespace-pre-line">
            {
              "The page you are looking for doesn't exist or has been moved. Please go back to the homepage."
            }
          </p>
        </div>
        <Link href="./" className="text-[12px]">
          <Button
            variant="black"
            className="font-inter font-semibold text-[14px] p-[15px] h-fit leading-[16.8px]"
          >
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
