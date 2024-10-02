import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface ModalProps extends DialogProps {
  title: string;
  children: ReactNode;
}
const ModalTemplate = (props: ModalProps) => {
  const { title, children, open } = props;
  return (
    <div>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> {title}</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>{children}</DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalTemplate;
