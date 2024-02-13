"use client"

import { CardWithList } from "@/types"
import { useParams } from "next/navigation"
import { useState, ElementRef, useRef } from 'react';
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useAction } from "@/hooks/use-actions";
import { useQueryClient } from "@tanstack/react-query";
import { updateCard } from "@/actions/update-card";


interface DescriptionProps{
    data:CardWithList
}

export const Description=({data}:DescriptionProps)=>{

    const params=useParams();

    const queryClient=useQueryClient()

    const [isEditing, setIsEditing]=useState(false);


    const formRef=useRef<ElementRef<"form">>(null);
    const textareaRef=useRef<ElementRef<"textarea">>(null);


    const enableEditing=()=>{
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
            
        }, );
    }

    const disabledEditing=()=>{
        setIsEditing(false);
    }

    const onKeyDown=(e:KeyboardEvent)=>{
        if(e.key==="Escape"){
            disabledEditing();
        }

    }


    useEventListener("keydown",onKeyDown);
    useOnClickOutside(formRef,disabledEditing);


    const {execute , fieldErrors}=useAction(updateCard,{
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            });
        }
    })

    return(
        <p>hello</p>
    )
}