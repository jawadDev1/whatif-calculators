import React from "react";

const Loader = () => {
  return (
    <span className="inline-block relative size-5 shrink-0  ">
      <span className="inline-block border-4 border-primary-blue border-r-dark-black w-full h-full rounded-full animate-spin"></span>
    </span>
  );
};

export default Loader;
