"use client"

import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import FormInput from "./form-input";
import { useFormState } from "react-dom";

const OrganizationIdPage =  async() => {

  const boards=await db.board.findMany();

  const initialState={message:null,errors:{}};
  const [state,dispatch]=useFormState(create,initialState)
  

  return (
    <div>
      <form action={dispatch}>

        <FormInput errors={state.errors}/>
     
        <Button type="submit" className="ml-2">Submit</Button>
      </form>

      <div className="space-y-2">
        {
          boards.map((board)=>(
            <Board key={board.id} id={board.id!} title={board.title!} />
          ))
        }
      </div>
    </div>
  );
};

export default OrganizationIdPage;
