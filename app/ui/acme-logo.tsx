import { MdOutlineBloodtype } from "react-icons/md";
import { lusitana } from "@/fonts";
import Link from "next/link";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center justify-between w-full p-4 leading-none text-white `}
    >
      <div className="flex flex-row items-center">
        <MdOutlineBloodtype className="h-12 w-12" />
        <p className="text-[44px]">Wiser</p>
      </div>

      {/* <div className="flex flex-row space-x-4">
        <Link
          href="/login"
          className="text-lg px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white no-underline"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="text-lg px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white no-underline"
        >
          Sign Up
        </Link>
      </div> */}
    </div>
  );
}
