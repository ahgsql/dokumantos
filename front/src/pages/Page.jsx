import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getPage from "../hooks/getPage";

export default function Category() {
  const [page, setPage] = useState(null);

  let params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let page = await getPage(params.slug);
      setPage(page.data);
      console.log(page.data);
      setIsLoading(false);
    })();
  });

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-row	gap-10 mt-10 space-between justify-center w-screen  ">
        <div className="flex flex-col  w-5/6 ">
          <Card className="w-full">
            {isLoading ? (
              <div className=" w-full flex flex-col items-baseline gap-3 p-10">
                <div>
                  <h1>
                    <Skeleton className="flex  w-32 h-7 mb-10" />
                  </h1>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-9 w-3/5 rounded-lg" />
                  <Skeleton className="h-9 w-4/5 rounded-lg" />
                  <Skeleton className="h-9 w-2/5 rounded-lg" />
                  <Skeleton className="h-9 w-4/5 rounded-lg" />
                  <Skeleton className="h-9 w-4/5 rounded-lg" />
                  <Skeleton className="h-9 w-4/5 rounded-lg" />
                  <Skeleton className="h-9 w-3/5 rounded-lg" />
                  <Skeleton className="h-9 w-4/5 rounded-lg" />
                </div>
              </div>
            ) : (
              <div className="p-10">
                <CardHeader>
                  <h1 className=" text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
                    {page.title}
                  </h1>
                </CardHeader>
                <CardBody className="w-full">
                  <MarkdownPreview source={page.content} className="" />
                </CardBody>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
