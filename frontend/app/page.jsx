import axios from "axios";

import { DataTable } from "./components/data-table";

import { FooterDefault } from "./components/footer-default";

import { columnEnrolledCourses } from "./shared/dashboard/columns.js"

import { baseUrl } from "./constants/server";

async function getUsers() {
  const { data } = await axios.get(`${baseUrl}/users/`);

  return data;
}

export default async function Home() {
  const data = await getUsers();
  
  const columns = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
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
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DataTable columns={columns} data={data} title="Usuários" />
      </main>
      
      <FooterDefault />
    </div>
  );
}
