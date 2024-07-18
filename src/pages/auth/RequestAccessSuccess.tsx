import { AuthLayout } from "@/components/layouts/AuthLayout";

const RequestAccessSuccess = () => {
	return (
		<AuthLayout>
			<div className="max-w-[400px] w-full">
				<h1 className="font-[400] text-white text-[30px] text-center">
					Request has been filed
				</h1>
				<p className="font-[400] text-[#D1D2FE] text-[14px] text-center">
					Please check your email for request status
				</p>
				<div className="mt-[64px] w-[300px] mx-auto">
					<img src="/assets/mail.png" alt="" className="w-full block" />
				</div>
			</div>
		</AuthLayout>
	);
};

export default RequestAccessSuccess;
