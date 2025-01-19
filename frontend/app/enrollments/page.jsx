import { DataTable } from "../components/data-table";

import axios from "axios";

import { baseUrl } from "../constants/server";

import CreateGeneric from "../components/create-generic";

async function getUsers() {
  const { data } = await axios.get(`${baseUrl}/enrollments/`);
  
  return data.map(item => {
    return {
      userName: item.user.name,
      courseTitle: item.course.title,
      enrolledAt: item.enrolledAt
    };
  });
}

export default async function Home() {
  const data = await getUsers();
  
  const columns = [
    {
      accessorKey: "userName",
      header: "Usuário",
    },
    {
      accessorKey: "courseTitle",
      header: "Curso Comprado",
    },
    {
      accessorKey: "enrolledAt",
      header: "Data de Compra",
      isDate: true,
    },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] lg:items-center justify-items-center min-h-screen p-8 pb-20 lg:gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DataTable columns={columns} data={data} title="Histórico de compras" />
        <CreateGeneric createRoute="enrollments-create" />
      </main>
    </div>
  );
}
