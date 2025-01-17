import { User } from "../entity/user";

export interface UserGateway {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByName(name: string): Promise<User[]>;
  findAll(): Promise<User[]>;
}