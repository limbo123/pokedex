import { IResultsData } from "./response/ResponseData";
export interface IPokemon {
  abilities: any[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  post_types: any[];
  species: IResultsData;
  sprites: { front_default: string };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: IResultsData;
  }[];
  weight: number;
}
