"use client";

import { useParams, useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useAction } from "@/hooks/use-actions";
import { toast } from "sonner";
import { error } from "console";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ListWrapper } from "./list-wrapper";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { createList } from "@/actions/create-list";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" Created`);
      disabledEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == "escape") {
      disabledEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disabledEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ title, boardId });
  }

    if (isEditing) {
      return (
        <ListWrapper>
          <form
            action={onSubmit}
            ref={formRef}
            className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
          >
            <FormInput
              ref={inputRef}
              errors={fieldErrors}
              id="title"
              className="text-sm px-2 py-1  font-medium border-transparent hover:border-input focus:border-input transition"
              placeholder="enter list title ..."
            />

            <input hidden value={params.boardId} name="boardId" />
            <div className="flex items-center gap-x-1">
              <FormSubmit>Add List</FormSubmit>
              <Button onClick={disabledEditing} size="sm" variant="ghost">
                <X className=" h-5 w-5" />
              </Button>
            </div>
          </form>
        </ListWrapper>
      );
    }

    return (
      <ListWrapper>
        <button
          onClick={enableEditing}
          className="w-fll rounded-md bg-white/80 hover:bg-white/50 transition p-3  flex items-center font-medium text-sm "
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a List
        </button>
      </ListWrapper>
    );
  };

