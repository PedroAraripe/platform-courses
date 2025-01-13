import { ApiExpress } from "./infra/api/express/api.express";
import { FindAllCourseRoute } from "./infra/api/express/routes/course/find-all-course.express.route";
import { FindByIdCourseRoute } from "./infra/api/express/routes/course/find-by-id-course.express.route";
import { SaveCourseRoute } from "./infra/api/express/routes/course/save-course.express.route";
import { FindAllUserRoute } from "./infra/api/express/routes/user/find-all-user.express.route";
import { FindByIdUserRoute } from "./infra/api/express/routes/user/find-by-id-user.express.route";
import { SaveUserRoute } from "./infra/api/express/routes/user/save-user.express.route";
import { CourseRepositoryPrisma } from "./infra/repositories/course/course.repository.prisma";
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { FindAllCourseUsecase } from "./usecases/course/find-all/find-all-course.usecase";
import { FindByIdCourseUsecase } from "./usecases/course/find-by-id/find-by-id-course.usecase";
import { SaveCourseUsecase } from "./usecases/course/save/save-course.usecase";
import { FindAllUserUsecase } from "./usecases/user/find-all/find-all-user.usecase";
import { FindByIdUserUsecase } from "./usecases/user/find-by-id/find-by-id-user.usecase";
import { SaveUserUsecase } from "./usecases/user/save/save-user.usecase";

function main() {
  // Users initialization routes
  const userRepository = UserRepositoryPrisma.create(prisma);
  const saveUserUsecase = SaveUserUsecase.create(userRepository);
  const findByIdUserUsecase = FindByIdUserUsecase.create(userRepository);
  const findAllUserUsecase = FindAllUserUsecase.create(userRepository);

  const saveUserRoute = SaveUserRoute.create(saveUserUsecase);
  const findByIdUserRoute = FindByIdUserRoute.create(findByIdUserUsecase);
  const findAllUserRoute = FindAllUserRoute.create(findAllUserUsecase);
  
  // Courses initialization routes
  const courseRepository = CourseRepositoryPrisma.create(prisma);
  const saveCourseUsecase = SaveCourseUsecase.create(courseRepository);
  const findByIdCourseUsecase = FindByIdCourseUsecase.create(courseRepository);
  const findAllCourseUsecase = FindAllCourseUsecase.create(courseRepository);

  const saveCourseRoute = SaveCourseRoute.create(saveCourseUsecase);
  const findByIdCourseRoute = FindByIdCourseRoute.create(findByIdCourseUsecase);
  const findAllCourseRoute = FindAllCourseRoute.create(findAllCourseUsecase);



  const api = ApiExpress.create([
    // User routes
    saveUserRoute,
    findByIdUserRoute,
    findAllUserRoute,
    // Course routes
    saveCourseRoute,
    findByIdCourseRoute,
    findAllCourseRoute,
  ]);
  const port = 8000;

  api.start(port);
}

main();