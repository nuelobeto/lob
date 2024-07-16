import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdEdit } from "react-icons/md";

const PersonalInfo = () => {
	const formSchema = z.object({
		username: z.string().optional(),
		email: z.string().optional(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	const editImage = () => {
		console.log("image");
	};

	return (
		<div className="w-full">
			<h2 className="font-[500] text-[20px] text-[#38385B] mb-[24px]">
				Personal Information
			</h2>

			<div className="relative w-fit mb-[36px]">
				<Avatar className="w-[120px] h-[120px]">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="absolute bottom-0 left-[80px]">
					<label className="flex bg-[#BBDDD9] rounded-full cursor-pointer">
						<div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#38385B]">
							<MdEdit className="text-[18px] text-[#FEFEFE]" />
						</div>
						<p className="whitespace-nowrap flex items-center text-[12px] pl-[8px] pr-[14px]">
							Change profile picture
						</p>
						<input
							type="file"
							id="file"
							className="hidden"
							onChange={editImage}
						/>
					</label>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-[20px] max-w-[500px]">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter username"
										{...field}
										className="border-[#FFCDE3]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter email address"
										{...field}
										className="border-[#FFCDE3]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="mt-[12px] flex gap-[12px]">
						<Button type="submit">Save changes</Button>
						<Button type="submit" variant="outline" className="bg-transparent">
							Verify email
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default PersonalInfo;
