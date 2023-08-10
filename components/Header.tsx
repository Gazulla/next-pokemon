import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col justify-center place-items-center pt-6">
      <Link href={`/`}>
        <div className="relative w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14">
          <Image src="/static/pokeball.svg" alt="Next Pokemon App" fill></Image>
        </div>
      </Link>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl flex flex-wrap justify-center">
        Next Pokemon App
      </h1>
    </header>
  );
}
