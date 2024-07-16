import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const Roles = () => {
	const formSchema = z.object({
		first_name: z.string().optional(),
		surname: z.string().optional(),
		email: z.string().optional(),
		permissions: z.string().optional(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: "",
			surname: "",
			email: "",
			permissions: "",
		},
	});

	const permission = useWatch({
		control: form.control,
		name: "permissions",
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div className="w-full">
			<h2 className="font-[500] text-[20px] text-[#38385B] mb-[24px]">
				Create and manage roles
			</h2>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-[20px]">
					<div className="flex gap-[20px]">
						<div className="flex-1">
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter Fisrt name"
												{...field}
												className="border-[#FFCDE3]"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1">
							<FormField
								control={form.control}
								name="surname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Surname</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter Surname"
												{...field}
												className="border-[#FFCDE3]"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

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
					<FormField
						control={form.control}
						name="permissions"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Content Type</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger
											className={`border-[#FFCDE3] ${
												field.value ? "text-[#38385B]" : "text-gray-400"
											}`}>
											<SelectValue placeholder="" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="master_admin">Master Admin</SelectItem>
										<SelectItem value="moderator">Moderator</SelectItem>
										<SelectItem value="community_manager">
											Community Manager
										</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>
									{permission === "master_admin" &&
										"Can add and remove others, Can create, edit and delete courses, students and instructors. Can delete comments and issues warnings."}
									{permission === "moderator" &&
										"Can create, edit and delete courses, students and instructors. Can delete comments and issues warnings."}
									{permission === "community_manager" &&
										"Can reply and delete comments, and issues warnings."}
								</FormDescription>
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

export default Roles;
