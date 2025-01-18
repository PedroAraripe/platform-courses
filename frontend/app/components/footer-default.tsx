import Image from "next/image";
import Link from 'next/link'

export function FooterDefault() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
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
    </footer>
  )
}