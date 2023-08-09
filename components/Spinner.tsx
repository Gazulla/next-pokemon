import Image from "next/image";

export default function Spinner() {
  return (
    <div className="mt-8 relative w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14">
      <Image
        className="rotate-center"
        src="/static/pokemon_icon_white.svg"
        alt="Loading"
        fill
      ></Image>
    </div>
  );
}
