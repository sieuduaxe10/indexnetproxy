import Image from "next/image";
import { CloudImage } from "./CloudImage";
export const MainHero = () => {
  return (
    <div className="w-[1041px] h-[632px] absolute bottom-[278px] left-[calc(50%-520.5px)] z-10 user-select-">
      <CloudImage />
      {/*  main Image*/}
      <div className="w-[840px] h-[478px] absolute bottom-0 left left-[calc(46.9741%-420px)] overflow-visible">
        {/* Monitor Image */}
        <div className="absolute top-[21%] left-[49%] translate-x-[-50%] translate-y-[-50%] aspect-[0.867374] h-auto w-[153px] opacity-100 will-change-transform">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/monitor-icon.avif"
              alt="netproxy monitor icon"
              width={153}
              height={176}
              className=""
            />
          </div>
        </div>
        {/* Goose Character */}
        <div className="absolute top-[57%] left-[64%] translate-x-[-50%] translate-y-[-50%] aspect-[0.950745] h-auto w-[400px]">
          <div className="absolute">
            <Image
              src="/images/hero/goose.png"
              alt="netproxy goose character"
              width={400}
              height={421}
              className=""
            />
          </div>
        </div>
        {/* Block 1 */}
        <div className="absolute z-10 top-[41%] left-[24%] translate-x-[-50%] translate-y-[-50%] aspect-[1.58498] h-auto w-[206px] opacity-100 will-change-transform">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/block-1.png"
              alt="Hero Image"
              width={206}
              height={130}
              className=""
            />
          </div>
        </div>
        {/* Block 2 */}
        <div className="absolute z-10 top-[55%] left-[24%] translate-x-[-50%] translate-y-[-50%] aspect-[1.58498] h-auto w-[206px] opacity-100 will-change-transform">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/block-1.png"
              alt="Hero Image"
              width={206}
              height={130}
              className=""
            />
          </div>
        </div>
        {/* Block 3 */}
        <div className="absolute z-10 top-[69%] left-[24%] translate-x-[-50%] translate-y-[-50%] aspect-[1.58498] h-auto w-[206px] opacity-100 will-change-transform">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/block-1.png"
              alt="Hero Image"
              width={206}
              height={130}
              className=""
            />
          </div>
        </div>
      </div>
      {/* Decorator */}
      <div className="">
        {/* HeroGlobe Icon */}
        <div className="absolute top-[180px] left-[30%] translate-x-[-50%] aspect-[0.933333] h-auto flex-none w-14 select-none">
          <div className="absolute">
            <Image
              src="/images/hero/hero-globe-icon.avif"
              alt="netproxy globe icon"
              width={56}
              height={60}
              className=""
            />
          </div>
        </div>
        {/* Hero cross top icon big */}
        <div className="absolute top-[198px] left-[74px] translate-y-[19px] rotate-[0deg] aspect-[1.01429] h-auto w-[49px] flex-none z-10 opacity-50 overflow-visible will-change-transform">
          <div className="absolute">
            <Image
              src="/images/hero/hero-cross-icon.png"
              alt="netproxy cross icon"
              width={71}
              height={70}
              className=""
            />
          </div>
        </div>
        {/* Hero round icon orange bottom */}
        <div className="absolute bottom-[-99px] left-[334px] rotate-149 aspect-[1] h-auto w-[39px] flex-none opacity-80 overflow-visible will-change-transform">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-round-icon.png"
              alt="netproxy round orange icon"
              width={59}
              height={59}
              className=""
            />
          </div>
        </div>
        {/* Hero play icon */}
        <div className="absolute -bottom-20 left-[942px] translate-y-[0px] rotate-[-30deg] aspect-[1.12097] h-auto w-[39px] opacity-100 overflow-visible will-change-transform">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-play-icon.png"
              alt="netproxy play icon"
              width={39}
              height={35}
              className=""
            />
          </div>
        </div>
        {/* Hero cross icon bottom left medium */}

        <div className="absolute bottom-[-122px] left-[150px] translate-y-[0px] rotate-[-30deg] aspect-[1.01429] h-auto w-[31px] z-10 opacity-50 overflow-visible will-change-transform">
          <div className="absolute">
            <Image
              src="/images/hero/hero-cross-icon-medium.png"
              alt="netproxy cross icon"
              width={31}
              height={31}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
