import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bar Chart",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1, // Set this to 1 to display only discrete (integer) values
      },
    },
  },
};
function BookingCountChart() {
  const [dailyBookingCounts, setDailyBookingCounts] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  useEffect(() => {
    const getBookings = async () => {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_REACT_APP_BASE_URL + `/bookings/count`
        );
        setDailyBookingCounts(responseData.dailyBookingCounts);
      } catch (err) {
        /* */
      }
    };
    getBookings();
  }, [sendRequest]);

  const labels = dailyBookingCounts.map((item) => item.movie);

  const data = {
    labels,
    datasets: [
      {
        label: "Movies",
        data: dailyBookingCounts.map((item) => item.count),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Today Booking Counts by Movie Title</Card.Title>
        {isLoading && <LoadingOverlay asOverlay />}
        <Bar options={options} data={data} />
      </Card.Body>
    </Card>
  );
}

export default BookingCountChart;
