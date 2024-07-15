import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
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

const VideoContent = () => {
	const formSchema = z.object({
		main_audio_language: z.string().min(1, {
			message: "",
		}),
		subtitles: z.string().min(1, {
			message: "",
		}),
		video: z.string().min(1, {
			message: "",
		}),
		video_description: z.string().min(1, {
			message: "",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			main_audio_language: "",
			subtitles: "",
			video: "",
			video_description: "",
		},
	});

	return <div>VideoContent</div>;
};

export default VideoContent;
