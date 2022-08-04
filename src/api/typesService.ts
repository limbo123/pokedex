import { IResponseData } from './../models/response/ResponseData';
import { AxiosResponse } from "axios";
import $api from ".";

export class TypesService {
    static async getAllTypes(): Promise<AxiosResponse<IResponseData>> {
        const response = await $api.get("/type?limit=999"); 
        return response;
    }
}