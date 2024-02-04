
import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

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

      <ul>
        {boards.map((board) => (
          <li key={board.id}>{board.title}</li>
        ))}
        </ul>
    </div>
  );
};

export default OrganizationIdPage;
