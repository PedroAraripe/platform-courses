import { User } from "../entity/user";

export interface UserGateway {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
}