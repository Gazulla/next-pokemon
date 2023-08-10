import Image from "next/image";
import { useState } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import useFilters from "@/hooks/useFilters";
import { capWord } from "@/utils/miscFunctions";
import {
  NEW_FILTERS,
  POKEMON_MAX_HEIGHT,
  POKEMON_MIN_HEIGHT,
  POKEMON_TYPES,
} from "@/constants/appConstants";

export default function Filters({
  numPokemons,
  numFilteredPokemons,
}: {
  numPokemons: number;
  numFilteredPokemons: number;
}) {
  const { filters, changeFilters, clearFilters } = useFilters();
  const [modalFilters, setModalFilters] = useState(NEW_FILTERS);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleWordChange = (newValue: string) => {
    changeFilters({ ...filters, word: newValue });
  };

  const handleMinMaxHeightChange = (newMin: number, newMax: number) => {
    setModalFilters(() => {
      return {
        ...modalFilters,
        minHeight: newMin,
        maxHeight: newMax,
      };
    });
  };

  const handleTypeChange = (newType: string) => {
    setModalFilters({ ...modalFilters, type: newType });
  };

  const handleSubmit = () => {
    handleModal(false);
    changeFilters(modalFilters);
  };

  const handleReset = () => {
    setModalFilters(() => NEW_FILTERS);
    clearFilters();
  };

  const handleModal = (option: boolean) => {
    setShowModal(() => option);
    !showModal && document.body.classList.add("overflow-hidden");
    showModal && document.body.classList.remove("overflow-hidden");
  };

  const modalColor =
    POKEMON_TYPES.find((t) => t.name === modalFilters.type)?.color || "#111111";

  return (
    <>
      <div className="flex mb-7 gap-7">
        <input
          className="pl-5 text-white bg-black rounded-md border-2"
          type="text"
          placeholder="Charizard, Newtwo..."
          onChange={(e) => handleWordChange(e.target.value)}
        ></input>
        <a
          className="hover:bg-red-600 p-1 rounded-md duration-300"
          href="#open-modal"
          onClick={() => handleModal(true)}
        >
          <Image
            src="/static/options.svg"
            alt="Options"
            width={40}
            height={40}
          ></Image>
        </a>
      </div>
      <div className="flex justify-between place-items-end w-full mb-2 gap-4">
        <div>
          <div>
            Loaded: <span className="font-bold">{numPokemons}</span>
          </div>
          <div>
            Shown by filters:{" "}
            <span className="font-bold">{numFilteredPokemons}</span>
          </div>
        </div>
        <div>
          <div>
            Type: <span className="font-bold">{capWord(filters.type)}</span>
          </div>
          <div>
            Height range:{" "}
            <span className="font-bold">
              {filters.minHeight} - {filters.maxHeight}
            </span>
          </div>
        </div>
      </div>

      <div id="open-modal" className="modal-window">
        <div
          className="border-2"
          style={{
            background:
              "linear-gradient(to right, #1e293baa, #000000aa)," + modalColor,
          }}
        >
          <a
            href="#"
            title="Close"
            className="modal-close hover:text-red-500 text-lg mr-2"
            onClick={() => handleModal(false)}
          >
            Close
          </a>

          <form className="flex flex-col">
            <label>Height</label>
            <MultiRangeSlider
              min={POKEMON_MIN_HEIGHT}
              max={POKEMON_MAX_HEIGHT}
              minVal={modalFilters.minHeight}
              maxVal={modalFilters.maxHeight}
              onChange={({ min, max }) => handleMinMaxHeightChange(min, max)}
            ></MultiRangeSlider>
            <label className="mt-3">Type</label>
            <select
              value={modalFilters.type}
              className="mt-3 p-3 pr-r text-white bg-black rounded-md border-2"
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="all">All</option>
              {POKEMON_TYPES.map((t) => {
                return (
                  <option key={t.name} value={t.name}>
                    {capWord(t.name)}
                  </option>
                );
              })}
            </select>
            <div>
              <a
                href="#"
                className={`flex justify-center place-items-center gap-2 relative  p-4 bg-red-600 hover:bg-red-500 border-black border-2 text-white font-bold  mt-8 rounded-md  hover:shadow-xl duration-300`}
                onClick={handleSubmit}
              >
                Find
              </a>
              <button
                className={`w-full flex justify-center place-items-center gap-2 relative  p-4 bg-red-600 hover:bg-red-500 border-black border-2 text-white font-bold  mt-8 rounded-md  hover:shadow-xl duration-300`}
                onClick={handleReset}
              >
                Clean
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
