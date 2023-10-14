import ClientReview from "@/components/Home/ClientReview";
import EventsByCategory from "@/components/Home/EventsByCategory";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeService from "@/components/Home/HomeService";
import LatestNews from "@/components/Home/LatestNews";
import OverView from "@/components/Home/OverView";
import TopBanner from "@/components/Home/TopBanner";
import UpcomingService from "@/components/Home/UpcomingService";
import { Footer } from "antd/es/layout/layout";
import { redirect } from "next/navigation";
// return redirect("/super_admin/admin");
const HomePage = () => {
  return (
    <div>
      <HomeHeader />
      <TopBanner />
      <HomeService />
      <UpcomingService />
      <EventsByCategory />
      <OverView />
      <ClientReview />
      <LatestNews />
      <Footer />
    </div>
  );
};

export default HomePage;
