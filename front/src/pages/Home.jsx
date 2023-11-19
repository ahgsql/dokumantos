import React, { useEffect, useState, useCallback } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Snippet } from "@nextui-org/react";
import Markdown from "react-markdown";

export default function Home() {
  const markdown =
    '# Hi, *Pluto*! ```javascript function test() {   console.log("This code will have a copy button to the right of it"); } ``` ';

  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-row	gap-10 space-between justify-center w-full ">
        <div className="flex flex-row w-1/3 gap-2 align-bottom justify-center p-4 min-h-full"></div>
        <div
          className="flex flex-col	w-full max-h-screen min-h-full  p-4"
          style={{ height: "85vh" }}
        >
          <div className="min-h-full flex flex-col gap-2 justify-center">
            <Markdown>{markdown}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
