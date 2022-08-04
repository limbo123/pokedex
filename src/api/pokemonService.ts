// import { AxiosResponse } from "axios";
import $api from ".";
// import { IResponseData } from '../models/response/ResponseData';
import { IResultsData } from "../models/ResultsData";

export class PokemonService {
    static async getAllPokemons(url: string): Promise<any> {
        const response = await $api.get(url);

        const fullObjectsPromises = await response.data.results.map(async(pokemon: IResultsData) => {
            const fullObject = await $api.get(pokemon.url);
            return fullObject;
        });

        const promisesData = await Promise.all(fullObjectsPromises).then(value => {
            return value;

        })

        const results = promisesData.map(data => {
            return data.data;
        })
        return {results, next: response.data.next};
    }

    // static async getPokemon(url: string): Promise<AxiosResponse<any>> {
    //     const response = await $api.get(url);
    //     return response;
    // }
}