import { IdGenerator } from "../../../infra/cryptography/id-generator";
import { PasswordHasherCrypt } from "../../../infra/cryptography/password-hasher-crypt";
import { EnrollmentWithCourseDto } from "../../enrollment/entity/enrollment";
import { UserProps } from "../types/user.types";
import { UserValidations } from "../validations/user-payload.validation";

 export type UserPublicDto = {
  name: string,
  email: string,
  enrollments?: EnrollmentWithCourseDto[],
  id: string,
  createdAt: Date,
  wasUpserted?: boolean,
}

export class User {
  private constructor(private readonly props: UserProps) {
    UserValidations.validate(props);
  }

  public static async create(name: string, password: string, email: string) {
    return new User({
      id: IdGenerator.execute(),
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

  public get wasUpserted() {
    return this.props?.wasUpserted;
  }

  public get enrollments() {
    return this.props.enrollments?.map(enrollment => enrollment.loadedCourseDto());
  }

  static async generateHashPassword(password:string ) {
    return await PasswordHasherCrypt.execute(password);
  }

  publicDto(): UserPublicDto {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      enrollments: this.enrollments,
      email: this.email,
    };
  }

  loadedEnrollmentsDto(): UserPublicDto {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      enrollments: this.enrollments,
      email: this.email,
      
    };
  }
}