import { Course } from "../entity/course";

export interface CourseGateway {
  save(course: Course): Promise<void>;
  findById(id: string): Promise<Course>;
  findByTitle(title: string): Promise<Course[]>;
  findAll(): Promise<Course[]>;
}