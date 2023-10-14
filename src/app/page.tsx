import HomeHeader from "@/components/Home/HomeHeader";
import TopBanner from "@/components/Home/TopBanner";
import { redirect } from "next/navigation";
// return redirect("/super_admin/admin");
const HomePage = () => {
  return (
    <div>
      <HomeHeader />
      <TopBanner/>
      <h1>Home page</h1>
    </div>
  );
};

export default HomePage;
