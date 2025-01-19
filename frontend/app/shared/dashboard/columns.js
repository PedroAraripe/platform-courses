const columnCoursesBase = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
]

export const columnCourses = [
  ...columnCoursesBase,
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    isDate: true,
  },
];

export const columnEnrolledCourses = [
  ...columnCoursesBase,
  {
    accessorKey: "createdAt",
    header: "Data de Compra",
    isDate: true,
  },
]