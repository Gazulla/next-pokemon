// Pokemon types
export interface PokemonType {
  id: number;
  name: string;
  color: string;
}

export interface PokemonListElement {
  id: number;
  name: string;
  types: string[];
  moves: string[];
  img: string;
  height: number;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: string[];
  moves: string[];
  img: string;
  height: number;
  weight: number;
  abilities: string[];
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

// Filters
export interface FiltersType {
  minHeight: number;
  maxHeight: number;
  type: string;
  word: string;
}

export interface FiltersContextType {
  filters: FilterType;
  setFilters: (filters: FiltersType) => void;
}

// Children prop
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
export type ChildrenType =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;
