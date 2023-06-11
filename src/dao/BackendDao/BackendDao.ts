import { Dao, Response } from "../Dao";

export type BackendResource = {
  id: string;
  label: string;
};

export interface BackendDao {
  getResources(): Promise<Response<BackendResource[]>>;
  getResourceById(id: string): Promise<Response<BackendResource>>;
}

export class BackendDaoImplementation extends Dao implements BackendDao {
  public constructor(baseUrl: string, bearerToken: string) {
    super(baseUrl, bearerToken);
  }

  public async getResources(): Promise<Response<BackendResource[]>> {
    return this.http("GET", "/resources");
  }

  public async getResourceById(id: string): Promise<Response<BackendResource>> {
    return this.http("GET", `/resources/${id}`);
  }
}
