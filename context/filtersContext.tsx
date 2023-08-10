/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { ChildrenType, FiltersContextType, FiltersType } from "@/types";
import { NEW_FILTERS } from "@/constants/appConstants";

type Props = {
  children: ChildrenType;
};

export const FilterContext = createContext<FiltersContextType>({} as any);

export function FilterContextProvider({ children }: Props) {
  const [filters, setFilters] = useState<FiltersType>(NEW_FILTERS);
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>
  );
}
