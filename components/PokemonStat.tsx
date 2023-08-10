type Props = {
  name: string;
  value: number;
};

export default function PokemonStat({ name, value }: Props) {
  return (
    <div className="grid grid-cols-5 mt-1">
      <div className="flex flex-col justify-center col-span-3">
        <div className="flex justify-end bg-slate-200 h-3 rounded-sm relative">
          <div
            className="bg-red-600 h-3 absolute rounded-sm"
            style={{ width: value / 1.7 + "%" }}
          ></div>
        </div>
      </div>
      <div className="font-semibold text-md col-span-2 ml-2 ">
        <span className="mr-2 text-xl text-cu">{value}</span>
        <span className="text-md text-slate-400">{name}</span>
      </div>
    </div>
  );
}
