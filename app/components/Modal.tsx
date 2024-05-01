import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

type props = {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const Modal = ({ isOpen, onClose }: props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <iframe height="500" src="https://www.youtube.com/embed/JOpWTNEAsX8?si=EbI2oaTH5s4boI_Y" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="w-full mt-5"></iframe>
      </DialogContent>
    </Dialog>
  )
}

export default Modal