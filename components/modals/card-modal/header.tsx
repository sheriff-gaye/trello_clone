"use client"

import { CardWithList } from "@/types";
import { useParams } from "next/navigation";


interface HeaderProps{
    data:CardWithList;
}

export const Header=({data}:HeaderProps)=>{

    const params=useParams();



    return(

        <div>
            hello
        </div>

    )
}