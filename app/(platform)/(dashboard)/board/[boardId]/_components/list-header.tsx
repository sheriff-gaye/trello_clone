"use client";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-actions";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { updateList } from '../../../../../../actions/update-list/index';

interface ListHeaderProps {
  data: List;
  onAddCart: () => void;
}

export const ListHeader = ({ data, onAddCart }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}`);
      setTitle(data.title);
      disabledEditing();
    },

    onError: (error) => {
      toast.error(error);
    }
  });

  const onSubmit = (formdata: FormData) => {
    const title = formdata.get("title") as string;
    const id = formdata.get("id") as string;
    const boardId = formdata.get("baordId") as string;

    if (title === data.title) {
      return disabledEditing();
    }

    execute({ id, title, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2  px-2  text-sm font-semibold  flex justify-centern items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className="flex-1  px-[2px]">
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />

          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title..."
            defaultValue={title}
            className="text-sm  px-[7px] py-1 h-7 font-semibold border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white "
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          className="w-full text-sm px-2.5  py-1 h-7 font-medium border-transparent"
          onClick={enableEditing}
        >{title}</div>
      )}
      {/* <ListOptions data={data}  onAddCart={onAddCart}/> */}
    </div>
  );
};
