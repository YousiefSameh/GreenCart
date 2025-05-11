import { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "@assets/assets";
import { IOrder } from "@customTypes/OrderTypes";
import { toast } from "react-toastify";

const TrackOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchOrders = async () => {
		try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      } else {
				toast.error(data.message);
			}
    } catch (error) {
      console.log(error);
    }
	};

  useEffect(() => {
    fetchOrders();
  }, [])

	return (
		<div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between md:p-10 p-4 space-y-4">
			<h2 className="text-lg font-medium">Orders List</h2>
			{orders.map((order, index) => (
				<div
					key={index}
					className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
				>
					<div className="flex items-center gap-5">
						<img
							className="w-12 h-12 object-cover"
							src={assets.box_icon}
							alt="boxIcon"
						/>
						<div className="flex flex-col gap-1">
							{order.items.map((item, index) => (
								<div key={index} className="flex flex-col">
									<p className="font-medium">
										{item.product.name}{" "}
										<span
											className="text-primary"
										>
											x {item.quantity}
										</span>
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="text-sm md:text-base text-black/60">
						<p className="text-black/80 font-medium mb-1">
							{order.address.firstName} {order.address.lastName}
						</p>
						<p>
							{order.address.street}, {order.address.city},{" "}
							{order.address.state},{order.address.zipcode},{" "}
							{order.address.country}
						</p>
            <p>{order.address.phone}</p>
					</div>

					<p className="font-medium text-base my-auto">
						{currency}{order.amount}
					</p>

					<div className="flex flex-col text-sm md:text-base text-black/60">
						<p>Method: {order.paymentType}</p>
						<p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
						<p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default TrackOrders;
