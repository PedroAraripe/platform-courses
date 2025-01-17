import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { Enrollment } from "../../../domain/enrollment/entity/enrollment";
import { Course } from "../../../domain/course/entity/course";

export class UserRepositoryPrisma implements UserGateway {
  constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new UserRepositoryPrisma(prismaClient);
  }

  public async save(user: User): Promise<User> {
    const data = {
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      createdAt: user.createdAt,
    }

    const createdUser = await this.prismaClient.users.upsert({
      where: {
        email: data.email
      },
      create: {
        ... data,
      },
      update: {},
    });
    
    return User.with({
      ...createdUser,
      wasUpserted: data.id !== createdUser.id
    });
  }

  public async findById(id: string): Promise<User> {
    const foundUser = await this.prismaClient.users.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
      },
    })

    if(!foundUser) {
      throw new NotFoundError("User"); 
    }

    return User.with({
      ...foundUser,
      enrollments: foundUser.enrollments.map(enrollment => {
        return Enrollment.with({
          ...enrollment,
          course: Course.with(enrollment.course)
        })
      })
    });
  }

  public async findByEmail(email: string): Promise<User> {
    const foundUser = await this.prismaClient.users.findUnique({
      where: { email },
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
      },
    })

    if(!foundUser) {
      throw new NotFoundError("User"); 
    }

    return User.with({
      ...foundUser,
      enrollments: foundUser.enrollments.map(enrollment => {
        return Enrollment.with({
          ...enrollment,
          course: Course.with(enrollment.course)
        })
      })
    });
  }

  public async findByName(name: string): Promise<User[]> {
    const foundUsers = await this.prismaClient.users.findMany({
      where: {
        name: {
          contains: name,
        }
      },
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
      },
    })

    if(!foundUsers.length) {
      throw new NotFoundError("Users"); 
    }

    return foundUsers.map(foundUser => User.with({
      ...foundUser,
      enrollments: foundUser.enrollments.map(enrollment => {
        return Enrollment.with({
          ...enrollment,
          course: Course.with(enrollment.course)
        })
      })
    }));
  }

  public async findAll(): Promise<User[]> {
    const foundUsers = await this.prismaClient.users.findMany({
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
      },
    })

    const usersFoundMapped = foundUsers.map(userFound => {
      return User.with({
        ...userFound,
        enrollments: userFound.enrollments.map(enrollment => {
          return Enrollment.with({
            ...enrollment,
            course: Course.with(enrollment.course)
          })
        })
      });
    });

    return usersFoundMapped;
  }
}