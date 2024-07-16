import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { routes } from "./routes";
import Readers from "@/pages/readers/Readers";
import AllReaders from "@/pages/readers/AllReaders";
import InviteReaders from "@/pages/readers/InviteReaders";
import ImportReadersCsv from "@/pages/readers/ImportReadersCsv";
import HumanBooks from "@/pages/human_books/HumanBooks";
import AllHumanBooks from "@/pages/human_books/AllHumanBooks";
import AddBook from "@/pages/human_books/add-book/AddBook";
import AddBookForm from "@/pages/human_books/add-book/AddBookForm";
import BookSummary from "@/pages/human_books/add-book/BookSummary";
import Events from "@/pages/events/Events";
import Activity from "@/pages/activity/Activity";
import AddModule from "@/pages/human_books/add-book/add-module/AddModule";
import AddModuleForm from "@/pages/human_books/add-book/add-module/AddModuleForm";
import AddContent from "@/pages/human_books/add-book/add-module/AddContent";
import BookDetails from "@/pages/human_books/BookDetails";
import Settings from "@/pages/settings/Settings";
import PersonalInfo from "@/pages/settings/PersonalInfo";
import AccountSecurity from "@/pages/settings/AccountSecurity";
import Notification from "@/pages/settings/Notification";
import Roles from "@/pages/settings/Roles";
import Messages from "@/pages/messages/Messages";
import ChatRoom from "@/pages/messages/ChatRoom";

const AppRouter = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Navigate to={`/${routes.dashboard}`} replace />}
			/>
			<Route path={routes.dashboard} element={<Dashboard />} />
			<Route path={routes.readers} element={<Readers />}>
				<Route index element={<AllReaders />} />
				<Route path={routes.invite_readers} element={<InviteReaders />} />
				<Route path={routes.import_csv} element={<ImportReadersCsv />} />
			</Route>
			<Route path={routes.human_books} element={<HumanBooks />}>
				<Route index element={<AllHumanBooks />} />
				<Route path={routes.add_book} element={<AddBook />}>
					<Route index element={<AddBookForm />} />
					<Route path={routes.add_module} element={<AddModule />}>
						<Route index element={<AddModuleForm />} />
						<Route path={routes.add_content} element={<AddContent />} />
					</Route>
					<Route path={routes.book_summary} element={<BookSummary />} />
				</Route>
				<Route path={routes.book_details} element={<BookDetails />} />
			</Route>
			<Route path={routes.events} element={<Events />} />
			<Route path={routes.activity} element={<Activity />} />
			<Route path={routes.settings} element={<Settings />}>
				<Route path={routes.personalInfo} element={<PersonalInfo />} />
				<Route path={routes.personalInfo} element={<PersonalInfo />} />
				<Route path={routes.account_security} element={<AccountSecurity />} />
				<Route path={routes.notification} element={<Notification />} />
				<Route path={routes.roles} element={<Roles />} />
			</Route>
			<Route path={routes.messages} element={<Messages />}>
				<Route index element={<ChatRoom />} />
				<Route path={`${routes.chat}/:chatId`} element={<ChatRoom />} />
			</Route>
		</Routes>
	);
};

export default AppRouter;
