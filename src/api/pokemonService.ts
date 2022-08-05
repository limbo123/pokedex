import { IPokemon } from "./../models/PokemonModel";
import $api from ".";
import { IResponseData, IResultsData } from "../models/response/ResponseData";

export class PokemonService {
  static async getAllPokemons(
    url: string
  ): Promise<{ results: IPokemon[]; next: string }> {
    // fetch all pokemons "mini" objects
    const response = await $api.get<IResponseData>(url);

    //fetching a full objects for each "mini" pokemon object
    const fullObjectsPromises = response.data.results.map(
      async (pokemon: IResultsData) => {
        const fullObject = await $api.get(pokemon.url);
        return fullObject;
      }
    );

    //resolving each promise
    const promisesData = await Promise.all(fullObjectsPromises).then(
      (value) => {
        return value;
      }
    );

    //getting data from each promise
    const results = promisesData.map((data) => {
      return data.data;
    });

    return { results, next: String(response.data.next) };
  }
}
