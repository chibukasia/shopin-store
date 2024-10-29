"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { authRedirect } from "@/utils";
import axiosClient from "@/utils/axios-client";
import { Package2, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdDashboard,
  MdStore,
  MdOutlineLocalConvenienceStore,
  MdPeopleAlt,
} from "react-icons/md";

const menuItems = [
  {
    name: "Dashboard",
    link: "/",
    icon: <MdDashboard size={32} />,
  },
  {
    name: "Stores",
    link: "/stores",
    icon: <MdStore size={32} />,
  },
  {
    name: "Users",
    link: "/users",
    icon: <MdPeopleAlt size={32} />,
  },
  {
    name: "Branches",
    link: "/store-branches",
    icon: <MdOutlineLocalConvenienceStore size={32} />,
  },
];
const SideBar = () => {
  const [collapsed, setCollapse] = useState<boolean>(false);
  const onCollapse = () => {
    setCollapse((prev) => !prev);
  };

  const router = useRouter()

  useEffect(() =>{
    axiosClient.get('/login/me').then((data) => console.log(data.data)).catch((error) => {
      authRedirect(router, error)
    })
  },[router])
  return (
    <div className="h-full">
      <div className="pt-2">
        <p onClick={onCollapse}>LOGO</p>
      </div>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {menuItems.map((item) => (
          <TooltipProvider key={item.link}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.link}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </div>
  );
};

export default SideBar;
