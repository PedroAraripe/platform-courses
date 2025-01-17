import { Course } from "../../course/entity/course";
import { User } from "../../user/entity/user";

export type EnrollmentProps = {
  id: string,
  userId: string,
  courseId: string,
  enrolledAt: Date,
  course?: Course,
  user?: User,
}
