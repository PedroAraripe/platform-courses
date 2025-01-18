import { DataTable } from "../components/data-table";

import axios from "axios";

import { FooterDefault } from "../components/footer-default";

import { columnCourses } from "../shared/dashboard/columns"

import { baseUrl } from "../constants/server";

async function getUsers() {
  const { data } = await axios.get(`${baseUrl}/courses/`);
  
  return data;
}

export default async function Home() {
  const data = await getUsers();
  
  const columns = columnCourses;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DataTable columns={columns} data={data} title="Cursos" />
      </main>
      
      <FooterDefault />
    </div>
  );
}
