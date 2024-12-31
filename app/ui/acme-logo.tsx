import { MdOutlineBloodtype } from "react-icons/md";
import { lusitana } from '@/fonts'
export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <MdOutlineBloodtype className="h-12 w-12 " />
      <p className="text-[44px]">Wiser</p>
    </div>
  );
}
