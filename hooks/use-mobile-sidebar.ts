import { create } from 'zustand'

type MobileSideBarStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

export const useMobileSideBar = create<MobileSideBarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))