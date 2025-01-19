import Image from "next/image";
import Link from 'next/link'

export function FooterDefault() {
  return (
    <nav
      className="sticky max-md:w-full bottom-0 row-start-3 flex flex-wrap items-center justify-center"
    >
      <div className="flex bg-white border-minimalist px-3 lg:px-4 gap-3 lg:gap-6 py-5">
        <Link
          href="/"
          className="hover:underline hover:underline-offset-4 hover:cursor-pointer"
        >
          <div className="flex items-center gap-2 ">
            <Image
              aria-hidden
              src="/users.svg"
              alt="File icon"
              width={18}
              height={18}
            />
            Usuários
          </div>
        </Link>
        
        <Link
          href="/courses"
          className="hover:underline hover:underline-offset-4 hover:cursor-pointer"
        >
          <div className="flex items-center gap-2 ">
            <Image
              aria-hidden
              src="/courses.svg"
              alt="File icon"
              width={18}
              height={18}
            />
            Cursos
          </div>
        </Link>
        
        <Link
          href="/enrollments"
          className="hover:underline hover:underline-offset-4 hover:cursor-pointer"
        >
          <div className="flex items-center gap-2 ">
            <Image
              aria-hidden
              src="/enrollments.svg"
              alt="File icon"
              width={18}
              height={18}
            />
            Compras
          </div>
        </Link>
      </div>
    </nav>
  )
}