import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type props = {
	onClick?: () => void;
	navigateTo?: string;
	label: string;
	className?: string;
};

const TextLink = ({ onClick, navigateTo, label, className }: props) => {
	return (
		<p
			className={cn(
				`font-bold text-brand-orange flex items-center font-openSans cursor-pointer transition-colors hover:text-foreground ${className}`,
			)}
			onClick={onClick}
		>
			{label} <Icons.circleArrowRight height={18} width={18} className="ml-2" />
		</p>
	);
};

export default TextLink;
