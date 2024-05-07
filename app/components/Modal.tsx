import { Dialog, DialogContent } from "@/components/ui/dialog";

type props = {
	isOpen: boolean;
	onClose: () => void;
	videoUrl?: string;
	children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: props) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-5xl p-0 border-none">
				<div className="overflow-auto w-full h-auto">{children}</div>
				{/* <iframe height="500" src="https://www.youtube.com/embed/JOpWTNEAsX8?si=EbI2oaTH5s4boI_Y" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full mt-5"></iframe> */}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
