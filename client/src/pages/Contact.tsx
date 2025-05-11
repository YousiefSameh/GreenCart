import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, ContactType } from "@validations/ContactSchema";

const Contact = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactType>({
    mode: "onBlur",
		resolver: zodResolver(ContactSchema),
	});

	const onSubmitHandler: SubmitHandler<ContactType> = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col items-center text-sm mt-12">
			<p className="text-lg text-primary font-medium pb-2">Contact Us</p>
			<h1 className="text-4xl font-semibold text-primary-dull/70 pb-4">
				Get in touch with us
			</h1>
			<p className="text-sm text-gray-500 text-center pb-10">
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry.
				<br />
				Lorem Ipsum has been the industry's standard dummy text.
			</p>

			<div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
				<div className="w-full">
					<label className="text-black/70" htmlFor="name">
						Your Name
					</label>
					<input
						{...register("name")}
						className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-primary/30"
					/>
					{errors.name && <p className="text-red-400">{errors.name.message}</p>}
				</div>
				<div className="w-full">
					<label className="text-black/70" htmlFor="name">
						Your Email
					</label>
					<input
						{...register("email")}
						className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-primary/30"
					/>
					{errors.email && <p className="text-red-400">{errors.email.message}</p>}
				</div>
			</div>

			<div className="mt-6 w-[350px] md:w-[700px]">
				<label className="text-black/70" htmlFor="name">
					Message
				</label>
				<textarea
					className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-primary/30"
					{...register("message")}
				></textarea>
				{errors.message && <p className="text-red-400">{errors.message.message}</p>}
			</div>

			<button
				type="submit"
				className="mt-5 bg-primary hover:bg-primary-dull text-white h-12 w-56 px-4 rounded active:scale-95 transition cursor-pointer"
			>
				Send Message
			</button>
		</form>
	);
};

export default Contact;
