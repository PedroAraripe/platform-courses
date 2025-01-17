import { Course } from "../entity/course";

export interface CourseGateway {
  save(course: Course): Promise<Course>;
  findById(id: string): Promise<Course>;
  findByTitle(title: string): Promise<Course[]>;
  findAll(): Promise<Course[]>;
}