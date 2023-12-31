import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from '../../../components/logo';

const NavBar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl flex  items-center w-full  justify-between mx-auto">
        <Logo />
        <div className="space-x-4  md:block md:w-auto flex  items-center justify-between w-full">
          <Button variant="outline" size="sm" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
