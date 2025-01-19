import Image from "next/image";
import Link from "next/link";

export default function CreateGeneric({createRoute}) {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center">
        <Link
          href={`/${createRoute}`}
          className="hover:underline hover:underline-offset-4 hover:cursor-pointer focus:outline-none focus:ring focus:ring-blue-300 rounded border-minimalist p-1 px-2"
        >
          <span>Cadastrar</span>
        </Link>
      </div>
    </div>
  );
}
