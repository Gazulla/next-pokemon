import Layout from "@/components/Layout";
import PokeButton from "@/components/PokeButton";
import Image from "next/image";
import Link from "next/link";

export default function page404() {
  return (
    <Layout>
      <div className="flex flex-col gap-2 mt-20">
        <h1 className="text-3xl ">
          <span className="font-bold text-4xl">404</span> - Pokemon no found!!
        </h1>
        <Link className="flex justify-center" href={"/"}>
          <PokeButton onClick={() => {}}>
            <div className="w-8 h-8 relative">
              <Image src="/static/pokeball.svg" alt="Pokeball" fill></Image>
            </div>
            <p>Return</p>
          </PokeButton>
        </Link>
      </div>
    </Layout>
  );
}
