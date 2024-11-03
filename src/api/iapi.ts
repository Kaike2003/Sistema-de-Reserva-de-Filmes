export interface IApi {
  start(port: number): void;
}

export interface IApiOptional {
  getRoutes(): void;
}
