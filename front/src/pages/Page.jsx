import {
  Card,
  CardBody,
  CardHeader,
  Link,
  Skeleton,
  Tab,
  Tabs,
} from "@nextui-org/react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Editable, useEditor } from "@wysimark/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getPage from "../hooks/getPage";
import removePage from "../hooks/removePage";
import { updatePage } from "../hooks/updatePage";
export default function Category() {
  const [page, setPage] = useState(null);
  const [catInfo, setCatInfo] = useState(null);

  let params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const editor = useEditor({
    minHeight: 600,
    maxWidth: 1000,
    authToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllwWkdmN2pJYTRQVEZVV2oifQ.eyJpYXQiOjE3MDAyNjE4MDIsImV4cCI6MTczMTgxOTQwMn0.fgQWGLOJ05LRGiIY_3pLhJMY1tCn7U6p5-HkPJmIaj0",
  });
  const [markdown, setMarkdown] = useState("");
  const [stateTracker, setStateTracker] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let page2 = await getPage(params.slug);
      setPage(page2.data);
      setCatInfo(page2.categoryInfo);
      setIsLoading(false);
      setMarkdown(page2.data.content);
    })();
  }, [stateTracker]);

  const pageRemove = async () => {
    await removePage(page._id);
    navigate("/category/" + catInfo.slug);
  };
  const pageUpdate = async () => {
    const data = {
      title: page.title,
      content: markdown,
    };
    await updatePage(page._id, data);
    setStateTracker(stateTracker + 1);
    toast.success("Page Güncellendi");
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-row	gap-10 mt-10 space-between justify-center w-screen  ">
        <div className="flex flex-col  w-5/6 ">
          <Tabs aria-label="Options" color="primary">
            <Tab key="icerik" title="İçerik" className="w-5/6">
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

                        <Link
                          href={"/category/" + catInfo.slug}
                          color="primary"
                        >
                          <p
                            className="pl-4 text-lg leading-none tracking-tight md:text-lg
                  lg:text-xl dark:text-white"
                          >
                            {catInfo.categoryname}
                          </p>
                        </Link>
                      </h1>
                    </CardHeader>
                    <CardBody className="w-full">
                      <MarkdownPreview source={page.content} className="" />
                    </CardBody>
                  </div>
                )}
              </Card>
            </Tab>
            <Tab key="duzenle" title="Düzenle" className="w-5/6">
              <Card>
                <CardBody>
                  <Editable
                    editor={editor}
                    value={markdown}
                    onChange={setMarkdown}
                  />
                </CardBody>
              </Card>
              <div className="mt-6 flex items-center justify-end gap-x-2">
                <button
                  type="reset"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={pageUpdate}
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Kaydet
                </button>
                <button
                  onClick={pageRemove}
                  type="button"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sil
                </button>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
