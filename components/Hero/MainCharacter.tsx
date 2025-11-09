import Image from "next/image";

export const MainCharacter = () => {
  return (
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
  );
};
