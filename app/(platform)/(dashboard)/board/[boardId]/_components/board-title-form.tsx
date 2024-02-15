"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { useAction } from "@/hooks/use-actions";
import { toast } from "sonner";
import { updateBoard } from '@/actions/update-board';

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
      onSuccess: (data) => {
        toast.success(`Board "${data.title}" updated!`);
        setTitle(data.title);
        disableEditing();
      },
      onError: (error) => {
        toast.error(error);
      }
    });

  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onSubmit = (formdata: FormData) => {
    const title = formdata.get("title") as string;

    execute({ title, id: data.id });
  };

  if (isEditing) {
    return (
      <form action={onSubmit} className="flex items-center gap-x-2">
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px]  py-1 h-7  bg-transparent  focus-visible:outline-none focus-visible:ring-transparent  border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1  px-2"
    >
      {title}
    </Button>
  );
};
