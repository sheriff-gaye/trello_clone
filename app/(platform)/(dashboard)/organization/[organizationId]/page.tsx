
import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Board } from "./board";
import { deleteBoard } from "@/actions/delete-board";

const OrganizationIdPage =  async() => {

  const boards=await db.board.findMany();

  

  return (
    <div>
      <form
        action={create}
      >
        <input
          type="text"
          id="title"
          required
          name="title"
          placeholder="Enter a Board Title"
          className=" border-black border p-2"
        />
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
