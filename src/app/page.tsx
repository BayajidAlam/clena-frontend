import HomeHeader from "@/components/Home/HomeHeader";
import { redirect } from "next/navigation";
// return redirect("/super_admin/admin");
const HomePage = () => {
  return (
    <div>
      <HomeHeader />
      <h1>Home page</h1>
    </div>
  );
};

export default HomePage;
