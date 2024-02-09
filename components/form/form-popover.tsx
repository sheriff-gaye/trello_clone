// "use client";


// import {X} from "lucide-react"
// import { useRouter } from "next/navigation";
// import { ElementRef,useRef } from "react";

// import { Popover,PopoverContent,PopoverTrigger,PopoverClose } from "../ui/popover";
// import { useAction } from "@/hooks/use-actions";
// import { createBoard } from "@/actions/create-board";
// import { Button } from "../ui/button";
// import { toast } from "sonner";


// interface FormPopoverProps {
//   children: React.ReactNode;
//   side?: "left" | "right" | "top" | "bottom";
//   align?:"center"|"start"|"end";
//   sideOffset?:number;

// }

// export const FormPopover = ({children,side="bottom",align,sideOffset=0}:FormPopoverProps) => {



//     const proModal=UseProModal();
//     const  router=useRouter();
//     const closeRef=useRef<ElementRef<"button">>(null);


//     const {execute , fieldErrors}=useAction(createBoard,{
//         onSuccess:(data)=>{
//             toast.success("Board Created");
//             closeRef.current?.click()
//             router.push(`/board/${data.id}`);
//         },
//         onError:(error)=>{
//             toast.error(error);
//             proModal.open();
//         }

//     });


//     const onSubmit=(formData:FormData)=>{
//         const title=formData.get('title') as string;
//         const image=formData.get('image') as string;

//         execute({title,image});

//     }


//     return(
//         <Popover>
//             <PopoverTrigger asChild>
//                 {children}
//             </PopoverTrigger>
//             <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset}>
//                 <div className="text-sm font-medium text-center text-neutral-600 pb-4">
//                     Create Board
//                 </div>
//                 <PopoverClose ref={closeRef} asChild>

//                     <Button>

//                     </Button>
//                 </PopoverClose>
//             </PopoverContent>
//         </Popover>


//     )

// };
