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
import Forum from "@/pages/forum/Forum";
import ForumMessages from "@/pages/forum/form_messages/ForumMessages";
import Comments from "@/pages/forum/form_messages/Comments";
import FlaggedComments from "@/pages/forum/form_messages/FlaggedComments";
import Support from "@/pages/support/Support";
import AllTickets from "@/pages/support/AllTickets";
import Auth from "@/pages/auth/Auth";
import SignIn from "@/pages/auth/SignIn";
import RequestAccess from "@/pages/auth/RequestAccess";
import RequestAccessSuccess from "@/pages/auth/RequestAccessSuccess";
import ProtectedRoutes from "./ProtectedRoutes";
import Otp from "@/pages/auth/Otp";

const AppRouter = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Navigate to={`/${routes.dashboard}`} replace />}
			/>
			<Route path={routes.auth} element={<Auth />}>
				<Route path={routes.sign_in} element={<SignIn />} />
				<Route path={routes.request_access} element={<RequestAccess />} />
				<Route
					path={routes.request_access_success}
					element={<RequestAccessSuccess />}
				/>
				<Route path={routes.otp} element={<Otp />} />
			</Route>

			<Route element={<ProtectedRoutes />}>
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
					<Route path=":chatId" element={<ChatRoom />} />
				</Route>
				<Route path={routes.forum} element={<Forum />}>
					<Route index element={<ForumMessages />} />
					<Route path=":forumId" element={<ForumMessages />}>
						<Route path={routes.forum_comments} element={<Comments />} />
						<Route
							path={routes.forum_flagged_comments}
							element={<FlaggedComments />}
						/>
					</Route>
				</Route>
				<Route path={routes.support} element={<Support />}>
					<Route index element={<AllTickets />} />
					<Route path=":ticketId" element={<AllTickets />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default AppRouter;
