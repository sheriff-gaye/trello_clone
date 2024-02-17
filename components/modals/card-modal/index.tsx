import { Dialog } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  return <Dialog open={isOpen} onOpenChange={onClose}>
    <p>hello word</p>

  </Dialog>;
};
