import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";
import cors from "cors";
import { GenericRouteErrorHandling } from "./routes/errors/generic-route-error-handling.error";
import { NotFoundError } from "../../../shared/errors/not-found.error";

export class ApiExpress implements Api {
  private app: Express;

  private constructor(routes: Route[]) {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.addRoutes(routes);
    this.addNotFoundRoute(this.app);
  }

  public static create(routes: Route[]) {
    return new ApiExpress(routes);
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();

      this.app[method](path, handler);
    });
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      this.listRoutes();
    });
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });

      console.log(routes);
  }

  private addNotFoundRoute(app: express.Express) {
    app.use((req, res, next) => {
      GenericRouteErrorHandling.handle(res, new NotFoundError("Rota")); 
    })
  }
}