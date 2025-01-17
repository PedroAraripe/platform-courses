import { Enrollment } from "../../enrollment/entity/enrollment"

export type UserProps = {
  name: string,
  password: string,
  email: string,
  id: string,
  enrollments?: Enrollment[],
  createdAt: Date
  wasUpserted?: boolean,
}