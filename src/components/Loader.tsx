import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

const Loader = () => {
  return (
    <main className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center overflow-hidden bg-background">
      <Bouncy size="45" speed="1.75" color="#ef8354" />
    </main>
  );
};

export default Loader;
