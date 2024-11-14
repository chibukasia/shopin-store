import ProfileCard from "@/components/molecules/cards/ProfileCard";
import SideBar from "@/components/molecules/navigations/SideBard";
import { ReactNode } from "react";

const DashboardLayout = (props: { children: ReactNode }) => {
  return (
    <section className="flex">
      <aside className="flex border-r bg-primary sm:flex h-screen overflow-scroll">
        <SideBar />
      </aside>
      <main className="w-full py-4 px-6 h-screen overflow-auto bg-muted/90">
        <div className="flex justify-between">
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
