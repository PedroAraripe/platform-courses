import { IdGenerator } from "../../../infra/cryptography/id-generator";
import { PasswordHasher } from "../../../infra/cryptography/password-hasher";
import { Enrollment, EnrollmentWithCourseDto } from "../../enrollment/entity/enrollment";
import { UserProps } from "../types/user.types";
import { UserValidations } from "../validations/user-payload.validation";

 export type UserPublicDto = {
  name: string,
  enrollments?: EnrollmentWithCourseDto[],
  id: string,
  createdAt: Date
}

export class User {
  private constructor(private readonly props: UserProps) {
    UserValidations.validate(props);
  }

  public static async create(name: string, password: string, email: string) {
    return new User({
      id: IdGenerator.generate(),
      name,
      email,
      password: password ? await User.generateHashPassword(password) : password,
      createdAt: new Date(),
    })
  }

  public static with(props: UserProps) {
    return new User(props);
  }

  public get name() {
    return this.props.name;
  }

  public get password() {
    return this.props.password;
  }

  public get email() {
    return this.props.email;
  }

  public get id() {
    return this.props.id;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get enrollments() {
    return this.props.enrollments?.map(enrollment => enrollment.loadedCourseDto());
  }

  static async generateHashPassword(password:string ) {
    return await PasswordHasher.hash(password);
  }

  publicDto(): UserPublicDto {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      enrollments: this.enrollments,
    };
  }

  loadedEnrollmentsDto(): UserPublicDto {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      enrollments: this.enrollments,
      
    };
  }
}