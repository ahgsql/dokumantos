import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
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
              <div className="columns-5 justify-center flex mt-10 w-full">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <CardHeader>
                  <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
                    TEST
                  </h1>
                </CardHeader>
                <CardBody className="w-full">
                  <MarkdownPreview source={page.content} className="" />
                </CardBody>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
