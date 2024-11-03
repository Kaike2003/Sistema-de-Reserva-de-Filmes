import { IApi, IApiOptional } from "../iapi";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
var compression = require("compression");
import { rateLimit } from "express-rate-limit";
import RouteList from "route-list";
require("dotenv").config();
import "reflect-metadata";

export default class ApiExpress implements IApi, IApiOptional {
  private constructor(private app: Express) {}

  public static build() {
    const app = express();
    app.use(express.static("public"));
    app.use(express.json({ limit: "10gb" }));
    app.use(express.urlencoded({ limit: "10gb" }));
    app.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(compression());
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        legacyHeaders: false,
      })
    );

    return new ApiExpress(app);
  }

  public postAdd(path: string, handler: (req: Request, res: Response) => void) {
    this.app.post(path, handler);
  }

  public putAdd(path: string, handler: (req: Request, res: Response) => void) {
    this.app.put(path, handler);
  }

  public deleteAdd(
    path: string,
    handler: (req: Request, res: Response) => void
  ) {
    this.app.delete(path, handler);
  }

  public getAdd(path: string, handler: (req: Request, res: Response) => void) {
    this.app.get(path, handler);
  }

  start(port: number): void {
    const porta = process.env["PORTA"];
    this.app.listen(porta || port, () => {
      console.log("Servidor rodando: " + porta || port);
    });
  }

  getRoutes(): void {
    const routesMap = RouteList.getRoutes(this.app, "express");

    RouteList.printRoutes(routesMap);
  }
}
