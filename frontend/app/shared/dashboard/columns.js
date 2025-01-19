export const columnCoursesRegister = [
  {
    accessorKey: "title",
    header: "Título",
    type: "string"
  },
  {
    accessorKey: "description",
    header: "Descrição",
    type: "string"
  },
  {
    accessorKey: "hours",
    header: "Duração (horas)",
    type: "number"
  },
]

export const columnCourses = [
  ...columnCoursesRegister,
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    isDate: true,
  },
];

export const columnEnrolledCourses = [
  ...columnCoursesRegister,
  {
    accessorKey: "createdAt",
    header: "Data de Compra",
    isDate: true,
  },
]

export const columnUsersBase = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

export const columnUsersRegister = [
  {
    accessorKey: "name",
    header: "Nome",
    type: "string"
  },
  {
    accessorKey: "email",
    header: "Email",
    type: "email"
  },
  {
    accessorKey: "password",
    header: "Senha",
    type: "password"
  },
];

export const columnUsers = [
  ...columnUsersBase,
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    isDate: true,
  },
  {
    accessorKey: "_check_more",
    header: "",
    subAccessorKey: ["enrollments", "course"],
    subHeader: "Cursos",
    subColumns: columnEnrolledCourses,
    subApiRoute: "enrollments"
  },
]