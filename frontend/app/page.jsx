import { DataTable } from "./components/data-table";

import CreateGeneric from "./components/create-generic";

import { columnUsers } from "./shared/dashboard/columns.js"

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] lg:items-center justify-items-center min-h-screen p-8 pb-20 lg:gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DataTable columns={columnUsers} title="Usuários" path="users" />
        <CreateGeneric createRoute="users-create" />
      </main>
    </div>
  );
}
