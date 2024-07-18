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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/router/routes";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Otp = () => {
	const navigate = useNavigate();

	const formSchema = z.object({
		digit1: z.string().min(1),
		digit2: z.string().min(1),
		digit3: z.string().min(1),
		digit4: z.string().min(1),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			digit1: "",
			digit2: "",
			digit3: "",
			digit4: "",
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
				<div className="w-[200px]">
					<img src="/assets/mail.png" alt="" className="w-full block" />
				</div>
				<AuthTitle className="mt-[20px] text-[#F9B233]">OTP</AuthTitle>
				<AuthSubTitle>Enter the OTP sent to youremail@gmail.com</AuthSubTitle>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full max-w-[350px] flex flex-col gap-[20px] mt-[24px]">
						<div className="flex items-center justify-center gap-[20px]">
							<FormField
								control={form.control}
								name="digit1"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												className="w-[60px] h-[60px] text-center"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="digit2"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												className="w-[60px] h-[60px] text-center"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="digit3"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												className="w-[60px] h-[60px] text-center"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="digit4"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												className="w-[60px] h-[60px] text-center"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<Link
							to={`/${routes.auth}/${routes.request_access}`}
							className="font-[400] text-[14px] text-[#525383] underline underline-offset-1 block mx-auto">
							Request a new code
						</Link>

						<Button
							type="submit"
							className="mt-[18px] border-2 border-[#38385B] bg-[#F9B233] h-[48px] text-[#38385B] hover:bg-[#F9B233]">
							Sign in
						</Button>
					</form>
				</Form>
			</AuthForm>
		</AuthLayout>
	);
};

export default Otp;
