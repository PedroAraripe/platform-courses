import { ApiExpress } from "./infra/api/express/api.express";
import { FindByIdUserRoute } from "./infra/api/express/routes/user/find-by-id-user.express.route";
import { SaveUserRoute } from "./infra/api/express/routes/user/save-user.express.route";
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { FindByIdUserUsecase } from "./usecases/user/find-by-id/find-by-id.usecase";
import { SaveUserUsecase } from "./usecases/user/save/save-user.usecase";

function main() {
  const userRepository = UserRepositoryPrisma.create(prisma);
  const saveUserUsecase = SaveUserUsecase.create(userRepository);
  const findByIdUserUsecase = FindByIdUserUsecase.create(userRepository);

  const saveUserRoute = SaveUserRoute.create(saveUserUsecase);
  const findByIdUserRoute = FindByIdUserRoute.create(findByIdUserUsecase);

  const api = ApiExpress.create([saveUserRoute, findByIdUserRoute]);
  const port = 8000;

  api.start(port);
}

main();