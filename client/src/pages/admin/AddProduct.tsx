import { categories } from "@assets/assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@store/hooks";
import actAddProduct from "@store/products/act/actAddProduct";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import {
	AddProductSchema,
	AddProductType,
} from "@validations/AddProductSchema";
import { isAxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const AddProduct = () => {
  const dispatch = useAppDispatch()
	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm<AddProductType>({
		mode: "onBlur",
		resolver: zodResolver(AddProductSchema),
		defaultValues: { images: Array(4).fill(undefined), description: "" },
	});

	// State for custom delete confirmation
	const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

	// Watch images for previews
	const watchedImages = watch("images") as (File | undefined)[];
	const previews = useMemo(
		() =>
			watchedImages.map((file) =>
				file instanceof File ? URL.createObjectURL(file) : null
			),
		[watchedImages]
	);

	// Cleanup object URLs
	useEffect(
		() => () => previews.forEach((url) => url && URL.revokeObjectURL(url)),
		[previews]
	);

	const confirmRemove = () => {
		if (deleteIndex === null) return;
		const arr = [...watchedImages];
		arr[deleteIndex] = undefined;
		setValue("images", arr);
		setDeleteIndex(null);
	};

	const cancelRemove = () => setDeleteIndex(null);

	const onSubmit = async (data: AddProductType) => {
		try {
			const productData = {
				name: data.name,
				description: data.description?.split("\n"),
				category: data.category,
				price: data.price,
				offerPrice: data.offerPrice,
			};

			const formData = new FormData();
			formData.append("productData", JSON.stringify(productData));

			data.images.forEach((file) => {
				if (file instanceof File) {
					formData.append("images", file);
				}
			});

			await dispatch(actAddProduct(formData));

			toast.success("Product added successfully!");
			reset({ images: Array(4).fill(undefined), description: "" });
		} catch (error) {
			if (isAxiosError(error)) {
				toast.error(axiosErrorHandler(error));
			} else {
				toast.error("Failed to add product");
			}
		}
	};

	return (
		<div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
			{/* Custom Confirmation Modal */}
			{deleteIndex !== null && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full">
						<p className="mb-4 text-center">
							Are you sure you want to remove this image?
						</p>
						<div className="flex justify-around">
							<button
								onClick={confirmRemove}
								className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
							>
								Remove
							</button>
							<button
								onClick={cancelRemove}
								className="px-4 py-2 bg-gray-300 text-gray-800 rounded cursor-pointer"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="p-4 px-6 space-y-5 max-w-lg"
			>
				<div>
					<p className="text-base font-medium">Product Image</p>
					<div className="flex flex-wrap items-center gap-3 mt-2">
						{Array(4)
							.fill("")
							.map((_, index) => (
								<Controller
									key={index}
									name="images"
									control={control}
									render={({ field }) => (
										<div className="relative">
											<label htmlFor={`image${index}`}>
												<input
													accept="image/*"
													type="file"
													id={`image${index}`}
													hidden
													onChange={(e) => {
														const file = e.target.files?.[0];
														const arr = [...field.value];
														arr[index] = file;
														field.onChange(arr);
													}}
												/>
												<img
													className="max-w-24 cursor-pointer"
													src={
														previews[index] ||
														"https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
													}
													alt="uploadArea"
													width={100}
													height={100}
												/>
											</label>
											{previews[index] && (
												<button
													type="button"
													onClick={() => setDeleteIndex(index)}
													className="absolute top-0 right-0 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
												>
													×
												</button>
											)}
										</div>
									)}
								/>
							))}
					</div>
					{errors.images && (
						<p className="text-sm text-red-600 mt-1">
							{errors.images.message as string}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-1 max-w-md">
					<label className="text-base font-medium" htmlFor="name">
						Product Name
					</label>
					<input
						id="name"
						type="text"
						placeholder="Type here"
						className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
						{...register("name")}
					/>
					{errors.name && (
						<p className="text-sm text-red-600">{errors.name.message}</p>
					)}
				</div>
				<div className="flex flex-col gap-1 max-w-md">
					<label className="text-base font-medium" htmlFor="description">
						Product Description
					</label>
					<textarea
						id="description"
						rows={4}
						className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
						placeholder="Type here"
						{...register("description")}
					/>
					{errors.description && (
						<p className="text-sm text-red-600">{errors.description.message}</p>
					)}
				</div>
				<div className="w-full flex flex-col gap-1">
					<label className="text-base font-medium" htmlFor="category">
						Category
					</label>
					<select
						id="category"
						className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
						{...register("category")}
					>
						<option value="">Select Category</option>
						{categories.map((item, idx) => (
							<option key={idx} value={item.path}>
								{item.path}
							</option>
						))}
					</select>
					{errors.category && (
						<p className="text-sm text-red-600">{errors.category.message}</p>
					)}
				</div>
				<div className="flex items-center gap-5 flex-wrap">
					<div className="flex-1 flex flex-col gap-1 w-32">
						<label className="text-base font-medium" htmlFor="price">
							Product Price
						</label>
						<input
							id="price"
							type="number"
							placeholder="0"
							className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
							{...register("price", { valueAsNumber: true })}
						/>
						{errors.price && (
							<p className="text-sm text-red-600">{errors.price.message}</p>
						)}
					</div>
					<div className="flex-1 flex flex-col gap-1 w-32">
						<label className="text-base font-medium" htmlFor="offer-price">
							Offer Price
						</label>
						<input
							id="offer-price"
							type="number"
							placeholder="0"
							className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
							{...register("offerPrice", { valueAsNumber: true })}
						/>
						{errors.offerPrice && (
							<p className="text-sm text-red-600">
								{errors.offerPrice.message}
							</p>
						)}
					</div>
				</div>
				<button
					type="submit"
					className="px-8 py-2.5 bg-primary hover:bg-primary-dull text-white font-medium rounded cursor-pointer transition uppercase"
				>
					Add
				</button>
			</form>
		</div>
	);
};

export default AddProduct;
