import CarouselManager from "../components/CarouselManager";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";

function DashboardPage() {
  return (
    <>
      <CarouselManager />
      <LineChart />
      <PieChart />
    </>
  );
}

export default DashboardPage;
