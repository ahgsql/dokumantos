import React, { useEffect, useState, useCallback } from "react";
import getCategoryPages from "../hooks/getCategoryPages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useParams } from "react-router-dom";
import {
  Button,
  Tooltip,
  SelectItem,
  Select,
  Input,
  Spinner,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  Divider,
  CardFooter,
} from "@nextui-org/react";
export default function Category() {
  const [pages, setPages] = useState([]);
  const [categ, setCateg] = useState(null);
  let location = useLocation();
  let params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let pages = await getCategoryPages(params.slug);
      setPages(pages.pages);
      setCateg(pages.category);
      console.log(pages.category);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-row	gap-10 mt-10 space-between justify-center w-full  ">
        <div className="flex flex-col ">
          <Card>
            {isLoading ? (
              <div className="columns-5 justify-center flex mt-10 w-full">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <CardHeader>
                  <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
                    {categ.categoryname}
                  </h1>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-3 gap-4">
                    {pages.map((page, i) => {
                      return (
                        <Card className="max-w-[400px]" key={i}>
                          <Link href={"/page/" + page.slug}>
                            <CardHeader className="flex gap-3">
                              <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                              />
                              <div className="flex flex-col">
                                <p className="text-md">{page.title}</p>
                              </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                              <p>DETAY</p>
                            </CardBody>
                            <Divider />
                          </Link>
                        </Card>
                      );
                    })}
                  </div>
                </CardBody>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
