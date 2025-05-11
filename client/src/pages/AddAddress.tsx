import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	AddAddressSchema,
	AddAddressType,
} from "@validations/AddAddressSchema";
import { assets } from "@assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "@store/hooks";
import axiosErrorHandler from "@utils/axiosErrorHandler";

const AddAddress = () => {
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.user);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddAddressType>({
		resolver: zodResolver(AddAddressSchema),
	});

	const onSubmit: SubmitHandler<AddAddressType> = async (address) => {
		try {
			const { data } = await axios.post('/api/address/add', { address });
			if (data.success) {
				toast.success(data.message);
				navigate('/cart');
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(axiosErrorHandler(error));
		}
	};
	useEffect(() => {
		if (!user) {
			navigate('/cart');
		}
	}, [navigate, user])
	return (
		<div className="mt-12 pb-12">
			<p className="text-2xl md:text-3xl text-gray-500">
				Add Shipping <span className="font-semibold text-primary">Address</span>
			</p>
			<div className="flex flex-col-reverse md:flex-row justify-between mt-10">
				<div className="flex-1 max-w-md">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-6 text-sm">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<input
									type="text"
									className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 foucs:border-primary transition"
									{...register("firstName")}
                  placeholder="Write First Name Here ..."
								/>
								{errors.firstName && (
									<p className="text-red-500">{errors.firstName.message}</p>
								)}
							</div>
							<div>
								<input
									type="text"
									className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 foucs:border-primary transition"
									{...register("lastName")}
                  placeholder="Write Last Name Here ..."
								/>
								{errors.lastName && (
									<p className="text-red-500">{errors.lastName.message}</p>
								)}
							</div>
						</div>
						<div>
							<input
								type="text"
								className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 foucs:border-primary transition"
								{...register("email")}
                placeholder="Write Email Here ..."
							/>
							{errors.email && (
								<p className="text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div>
							<input
								type="text"
								className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 foucs:border-primary transition"
								{...register("street")}
                placeholder="Write Street Here ..."
							/>
							{errors.street && (
								<p className="text-red-500">{errors.street.message}</p>
							)}
						</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 foucs:border-primary transition"
                  {...register("city")}
                  placeholder="Write City Here ..."
                />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 foucs:border-primary transition"
                  {...register("state")}
                  placeholder="Write State Here ..."
                />
                {errors.state && (
                  <p className="text-red-500">{errors.state.message}</p>
                )}
              </div>
						</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 foucs:border-primary transition"
                  {...register("zipcode")}
                  placeholder="Write Zip Code Here ..."
                />
                {errors.zipcode && (
                  <p className="text-red-500">{errors.zipcode.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 foucs:border-primary transition"
                  {...register("country")}
                  placeholder="Write Country Here ..."
                />
                {errors.country && (
                  <p className="text-red-500">{errors.country.message}</p>
                )}
              </div>
						</div>
            <div>
              <input
                type="text"
                className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 foucs:border-primary transition"
                {...register("phone")}
                placeholder="Write Phone Here ..."
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase">Save Address</button>
					</form>
				</div>
				<img
					src={assets.add_address_iamge}
					className="md:mr-16 mb-16 md:mt-0"
					alt="Add Address"
				/>
			</div>
		</div>
	);
};

export default AddAddress;
