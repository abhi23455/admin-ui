import React from "react";
import Card from "../Elements/Card";
import CircularProgress from '@mui/material/CircularProgress';
import Icon from "../Elements/Icon";

// Sample data untuk fallback
const sampleData = [
  {
    id: 1,
    name: "Figma - Yearly Plan",
    description: "For advanced security and more flexible controls",
    icon: <Icon.Figma />,
    date: "15",
    month: "May",
    lastCharge: "2025-05-14",
    amount: 150,
  },
  {
    id: 2,
    name: "Adobe Inc - Yearly Plan",
    description: "For advanced security",
    icon: <Icon.Adobe />,
    date: "16",
    month: "June",
    lastCharge: "2025-06-17",
    amount: 559,
  },
];

function CardUpcomingBill(props) {
  const { data } = props;
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (data && data.length > 0) {
      setIsLoading(false);
    } else {
      // Setelah 2 detik, anggap loading selesai
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  // Tentukan data yang akan ditampilkan
  const displayData = (data && data.length > 0) ? data : sampleData;

  return (
    <>
      <Card
        title="Upcoming Bill"
        link="/bill"
       	desc={
          isLoading ? (
            <div className="flex flex-col justify-center items-center h-full text-primary">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              Loading Data
            </div>
          ) : (
            <div className="flex flex-col justify-around h-full">
							{displayData.map((item) => (
			          <div key={item.id} className="flex justify-between pt-3 pb-3">
			            <div className="flex">
			              <div className="bg-special-bg p-4 rounded-lg flex flex-col">
			                <span className="text-xs">{item.month}</span>
			                <span className="text-2xl font-bold">{item.date}</span>
			              </div>
			              <div className="ms-10">
			                {item.icon}
			                <span className="font-bold">{item.name}</span>
			                <br />
			                <span className="text-xs">Last Charge - {item.lastCharge}</span>
			              </div>
			            </div>
			            <div className="flex items-center">
			              <span className="py-2 px-4 border border-gray-05 rounded-lg font-bold">
			                ${item.amount}
			              </span>
			            </div>
			          </div>
			        ))}
			    </div>
          )
        }
      />
    </>
  );
}

export default CardUpcomingBill;