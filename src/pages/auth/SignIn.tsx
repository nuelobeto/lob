import {
	AuthForm,
	AuthLayout,
	AuthLogo,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "@/router/routes";

const SignIn = () => {
	const navigate = useNavigate();

	const formSchema = z.object({
		email: z.string().min(1, {
			message: "Please enter a registered or Valid email",
		}),
		password: z.string().min(1, {
			message: "Password is required",
		}),
		remember_me: z.boolean().optional(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			remember_me: false,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		navigate(`/${routes.dashboard}`);
	}

	return (
		<AuthLayout>
			<AuthForm>
				<AuthLogo />
				<AuthTitle className="mt-[20px]">Welcome back,</AuthTitle>
				<AuthSubTitle>Please enter your details.</AuthSubTitle>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full max-w-[350px] flex flex-col gap-[20px] mt-[24px]">
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
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between">
							<FormField
								control={form.control}
								name="remember_me"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel className="font-[300] text-[#525383]">
												Remember for 30 days
											</FormLabel>
										</div>
									</FormItem>
								)}
							/>

							<Link
								to={`/${routes.auth}/${routes.request_access}`}
								className="font-[400] text-[14px] text-[#525383] underline underline-offset-1">
								Request Access
							</Link>
						</div>
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

export default SignIn;
