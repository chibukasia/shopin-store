import ProfileCard from "@/components/molecules/cards/ProfileCard";
import { ReactNode } from "react";

const DashboardLayout = (props: { children: ReactNode }) => {
  return (
    <section className="flex gap-3">
      <nav className="bg-teal-500 pr-4 pl-2"></nav>
      <main className=" w-full p-2 pr-4">
        <div className="flex justify-between">
            <div>
                <h2 className="text-xl font-bold">Shopin Dashboard</h2>
            </div>
          <ProfileCard />
        </div>
        {props.children}
      </main>
    </section>
  );
};
export default DashboardLayout;
