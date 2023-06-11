import { Response, ValidResponse } from "../Dao";
import { BackendDao, BackendResource } from "./BackendDao";

export class BackendDaoMock implements BackendDao {
  getResources(): Promise<ValidResponse<BackendResource[]>> {
    return Promise.resolve({
      ok: this.getMockResources(),
      err: null,
    });
  }

  getResourceById(id: string): Promise<Response<BackendResource>> {
    const resources = this.getMockResources();
    const found = resources.find((r) => r.id === id);
    return Promise.resolve<Response<BackendResource>>(
      found
        ? {
            ok: found,
            err: null,
          }
        : {
            ok: null,
            err: {
              response: null,
              statusCode: 404,
              message: `resource ${id} not found`,
            },
          }
    );
  }

  private getMockResources(): BackendResource[] {
    return [
      { id: "1", label: "one" },
      { id: "2", label: "two" },
    ];
  }
}
