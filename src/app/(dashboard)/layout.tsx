import ProfileCard from "@/components/molecules/cards/ProfileCard";
import SideBar from "@/components/molecules/navigations/SideBard";
import { ReactNode } from "react";

const DashboardLayout = (props: { children: ReactNode }) => {
  return (
    <section className="flex">
      <aside className="flex border-r bg-teal-500 sm:flex h-screen overflow-scroll">
        <SideBar />
      </aside>
      <main className="w-full p-2 pr-4 h-screen overflow-auto">
        <div className="flex justify-between px-6">
          <div>
            <h2 className="text-xl font-bold">Shopin Logo</h2>
            <p className="text-xs text-balance">
              Expirience fast and convinient shopping
            </p>
          </div>
          <ProfileCard />
        </div>
        {props.children}
      </main>
    </section>
  );
};
export default DashboardLayout;
