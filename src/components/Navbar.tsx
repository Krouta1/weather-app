"use client";
import { Button } from "./ui/button";
import { github } from "@/app/utils/icons";
import { ModeToggle } from "./ThemeDropdown/ThemeDropDown";
import Link from "next/link";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "@/app/context/globalContext";

const Navbar = () => {
  const { state } = useGlobalContext();

  return (
    <div className="flex w-full items-center justify-end py-4">
      <div className="left">
        <div className="search-container flex w-full shrink-0 gap-2 sm:w-fit">
          <SearchDialog />
          <div className="bt-group flex items-center gap-2">
            <ModeToggle />
            <Button asChild>
              <Link
                href="https://github.com"
                className="source-code-btn flex items-center gap-2"
                target="_blank"
              >
                {github} Source Code
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
