import { useState } from "react";

type BoxProps = {
  shouldButtonBeVisible?: boolean;
  children: React.ReactNode;
};

function Box({ shouldButtonBeVisible, children }: BoxProps) {
  const [isOpen, setOpen] = useState(true);

  return (
    <div className="flex flex-col box-shadow w-1/2 h-[500px] overflow-y-scroll">
      {shouldButtonBeVisible && (
        <button
          onClick={() => setOpen(!isOpen)}
          className="btn btn-ghost btn-circle text-2xl self-end z-10"
        >
          {isOpen ? "-" : "+"}
        </button>
      )}
      {isOpen && children}
    </div>
  );
}

export default Box;
