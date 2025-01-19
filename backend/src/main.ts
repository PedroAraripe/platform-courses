import { ApiExpress } from "./infra/api/express/api.express";
import { FindAllCourseRoute } from "./infra/api/express/routes/course/find-all-course.express.route";
import { SaveCourseRoute } from "./infra/api/express/routes/course/save-course.express.route";
import { FindAllEnrollmentRoute } from "./infra/api/express/routes/enrollment/find-all-enrollment.express.route";
import { FindByUserIdEnrollmentRoute } from "./infra/api/express/routes/enrollment/find-by-user-id-enrollment.express.route";
import { SaveEnrollmentRoute } from "./infra/api/express/routes/enrollment/save-enrollment.express.route";
import { FindAllUserRoute } from "./infra/api/express/routes/user/find-all-user.express.route";
import { FindByIdUserRoute } from "./infra/api/express/routes/user/find-by-id-user.express.route";
import { SaveUserRoute } from "./infra/api/express/routes/user/save-user.express.route";
import { CourseRepositoryPrisma } from "./infra/repositories/course/course.repository.prisma";
import { EnrollmentRepositoryPrisma } from "./infra/repositories/enrollment/enrollment.repository.prisma";
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { FindAllCourseUsecase } from "./usecases/course/find-all/find-all-course.usecase";
import { SaveCourseUsecase } from "./usecases/course/save/save-course.usecase";
import { FindAllEnrollmentUsecase } from "./usecases/enrollment/find-all/find-all-enrollment.usecase";
import { FindByIdEnrollmentUsecase } from "./usecases/enrollment/find-by-id/find-by-id-enrollment.usecase";
import { FindByUserIdEnrollmentUsecase } from "./usecases/enrollment/find-by-user-id/find-by-user-id-enrollment.usecase";
import { SaveEnrollmentUsecase } from "./usecases/enrollment/save/save-enrollment.usecase";
import { FindAllUserUsecase } from "./usecases/user/find-all/find-all-user.usecase";
import { FindByIdUserUsecase } from "./usecases/user/find-by-id/find-by-id-user.usecase";
import { SaveUserUsecase } from "./usecases/user/save/save-user.usecase";

function main() {
  // Users routes
  const userRepository = UserRepositoryPrisma.create(prisma);

  const saveUserUsecase = SaveUserUsecase.create(userRepository);
  const findByIdUserUsecase = FindByIdUserUsecase.create(userRepository);
  const findAllUserUsecase = FindAllUserUsecase.create(userRepository);

  const saveUserRoute = SaveUserRoute.create(saveUserUsecase);
  const findByIdUserRoute = FindByIdUserRoute.create(findByIdUserUsecase);
  const findAllUserRoute = FindAllUserRoute.create(findAllUserUsecase);
  
  // Courses routes
  const courseRepository = CourseRepositoryPrisma.create(prisma);

  const saveCourseUsecase = SaveCourseUsecase.create(courseRepository);
  const findAllCourseUsecase = FindAllCourseUsecase.create(courseRepository);

  const saveCourseRoute = SaveCourseRoute.create(saveCourseUsecase);
  const findAllCourseRoute = FindAllCourseRoute.create(findAllCourseUsecase);
  
  // Enrollments routes
  const enrollmentRepository = EnrollmentRepositoryPrisma.create(prisma);

  const saveEnrollmentUsecase = SaveEnrollmentUsecase.create(enrollmentRepository, userRepository, courseRepository);
  const findByIdEnrollmentUsecase = FindByIdEnrollmentUsecase.create(enrollmentRepository);
  const findAllEnrollmentUsecase = FindAllEnrollmentUsecase.create(enrollmentRepository);
  const findByUserIdEnrollmentUsecase = FindByUserIdEnrollmentUsecase.create(enrollmentRepository);

  const saveEnrollmentRoute = SaveEnrollmentRoute.create(saveEnrollmentUsecase);
  const findAllEnrollmentRoute = FindAllEnrollmentRoute.create(findAllEnrollmentUsecase);
  const findByUserIdEnrollmentRoute = FindByUserIdEnrollmentRoute.create(findByUserIdEnrollmentUsecase);
  
  const api = ApiExpress.create([
    // User routes
    saveUserRoute,
    findByIdUserRoute,
    findAllUserRoute,

    // Course routes
    saveCourseRoute,
    findAllCourseRoute,

    // Enrollment routes
    saveEnrollmentRoute,
    findAllEnrollmentRoute,
    findByUserIdEnrollmentRoute,
  ]);

  const port = 5000;

  api.start(port);
}

main();