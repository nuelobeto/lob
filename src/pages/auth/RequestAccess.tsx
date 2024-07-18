import {
	AuthForm,
	AuthLayout,
	AuthSubTitle,
	AuthTitle,
} from "@/components/layouts/AuthLayout";
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
import { routes } from "@/router/routes";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const RequestAccess = () => {
	const navigate = useNavigate();

	const formSchema = z.object({
		first_name: z.string().min(1, {
			message: "First name is required",
		}),
		last_name: z.string().min(1, {
			message: "Last name is required",
		}),
		email: z.string().min(1, {
			message: "Email is required",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<AuthLayout>
			<AuthForm>
				<div className="w-full">
					<Button
						size="icon"
						variant="outline"
						className="rounded-full bg-transparent"
						onClick={() => navigate(`/${routes.auth}/${routes.sign_in}`)}>
						<MdArrowBack className="text-[22px]" />
					</Button>
				</div>
				<AuthTitle className="mt-[20px]">Request Access</AuthTitle>
				<AuthSubTitle>Welcome back! Please enter your details.</AuthSubTitle>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full max-w-[350px] flex flex-col gap-[20px] mt-[24px]">
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Enter your first name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Enter your last name"
											{...field}
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
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Enter your email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="mt-[12px] border-2 border-[#38385B] bg-[#F9B233] h-[48px] text-[#38385B] hover:bg-[#F9B233]">
							Next
						</Button>
					</form>
				</Form>
			</AuthForm>
		</AuthLayout>
	);
};

export default RequestAccess;
