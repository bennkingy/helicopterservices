import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type props = {
	isOpen: boolean;
	onClose: () => void;
	videoUrl?: string;
	title?: string; // read by screen readers, not shown
	children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title = "Helicopter details", children }: props) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-5xl p-0 border-none">
				<DialogTitle className="sr-only">{title}</DialogTitle>
				<div className="overflow-auto">{children}</div>
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
