"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { CreateBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLog } from "@/lib/create-audit-logs";

const handler = async (data: InputType): Promise<ReturnType> => {

    const { userId,orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }
    const { title,image } = data

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
      ] = image.split("|");

      console.log( imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName)
    
      if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
          error: "Missing fields. Failed to create board."
        };
      }
    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML,
            }
        });

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE,
        })


    } catch (error) {
        return {
            error: "Failed to create board"
        }
    }
    revalidatePath(`/board/${board.id}`);

    return{data:board}

}

export const createBoard = createSafeAction(CreateBoard, handler);