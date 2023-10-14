import { redirect } from "next/navigation";

const HomePage = () => {
  return redirect("/super_admin/admin");
};

export default HomePage;
