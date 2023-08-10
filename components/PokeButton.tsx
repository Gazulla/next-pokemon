import { ChildrenType } from "@/types";

export default function PokeButton({
  children,
  onClick,
}: {
  children: ChildrenType;
  onClick: () => any;
}) {
  return (
    <button
      className={`flex justify-center place-items-center gap-2 relative  p-4 bg-red-600 hover:bg-red-500 border-white border-2 text-white font-bold  mt-8 rounded-md  hover:shadow-xl duration-300`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
