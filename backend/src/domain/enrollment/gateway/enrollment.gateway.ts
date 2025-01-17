import { Enrollment } from "../entity/enrollment";

export interface EnrollmentGateway {
  save(course: Enrollment): Promise<Enrollment>;
  findById(id: string): Promise<Enrollment>;
  findByUserId(id: string): Promise<Enrollment[]>;
  findAll(): Promise<Enrollment[]>;
}