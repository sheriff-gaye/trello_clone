import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvier } from "@/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster />
      <QueryProvier>
      <ModalProvider />
      {children}
      </QueryProvier>
    </ClerkProvider>
  );
};

export default PlatformLayout;
