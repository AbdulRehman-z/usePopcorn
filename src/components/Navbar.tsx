import { useEffect, useRef } from "react";

type NavbarProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  count: number;
};

function Navbar({ count, query, setQuery }: NavbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    function () {
      const callback = (e: KeyboardEvent) => {
        if (document.activeElement === inputRef.current) return;

        if (e.code === "Enter") {
          inputRef.current?.focus();
          setQuery("");
        }
      };

      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery],
  );

  return (
    <div className="navbar box-shadow">
      <a className="text-secondary flex-1 font-bold text-2xl">
        usePopcorn
      </a>
      <div className="gap-20">
        <div className="form-control">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="input input-bordered w-32 md:w-auto"
            ref={inputRef}
          />
        </div>
        <p className="text-md font-semibold">
          Found <span className="font-bold">{count}</span> results
        </p>
      </div>
    </div>
  );
}

export default Navbar;
