import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex justify-center place-items-center mt-auto mb-3 py-10 gap-3 flex-wrap">
      <p>Demo App made by Pedro Iván Gazulla</p>

      <a
        href="https://www.linkedin.com/in/gazudev/"
        target="_blank"
        rel="noreferrer"
        className="flex gap-1 text-lg hover:bg-red-500 duration-300 px-1"
      >
        <Image
          src="/static/linkedin.svg"
          alt="Linkedin Pedro Iván Gazulla"
          width={15}
          height={15}
          className="w-6"
        ></Image>
        Gazudev
      </a>
    </footer>
  );
}
