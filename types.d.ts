// Pokemon type
export interface PokemonType {
  id: number;
  name: string;
  color: string;
}

// Pokemon card
export interface PokemonListElement {
  id: number;
  name: string;
  types: string[];
  moves: string[];
  img: string;
  height: number;
}

// Pokemon Details
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

// Pokemon context
export interface PokemonContextType {
  pokemons: PokemonListElement[];
  setPokemons: (pokemons: PokemonListElement[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  offset: number;
  setOffset: (offset: number) => void;
  isFirstFetch: boolean;
  setIsFirstFetch: (isFirstFetch: boolean) => void;
}

// Children prop
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
export type ChildrenType = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
