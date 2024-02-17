"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/create-audit-logs";

const handler = async (data: InputType): Promise<ReturnType> => {

    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }
    const { id } = data
    let board;


    try {
        board = await db.board.delete({
            where: {
                id, orgId
            }
        })

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE,
          })

    } catch (error) {
        return {
            error: "Failed To Delete Board"
        }

    }

    revalidatePath(`/organization/${orgId}`);
    redirect(`/organization/${orgId}`);

}

export const deleteBoard = createSafeAction(DeleteBoard, handler);