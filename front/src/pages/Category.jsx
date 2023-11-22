import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
  Spinner,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getCategoryPages from "../hooks/getCategoryPages";
import { LangContext } from "../context/LangProvider";
export default function Category() {
  const [pages, setPages] = useState([]);
  const [categ, setCateg] = useState(null);
  const { t } = useContext(LangContext);
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
        <div className="flex flex-col w-3/5">
          <Card>
            {isLoading ? (
              <div className="columns-5 justify-center flex mt-10 w-4/5">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <CardHeader>
                  <h1 className="mb-0 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white ">
                    {categ.categoryname}
                  </h1>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-4 gap-4">
                    {pages.map((page, i) => {
                      return (
                        <Card key={i} className="w-full">
                          <Link href={"/page/" + page.slug}>
                            <CardHeader className="absolute z-10 top-0 flex-col !items-end	">
                              <div className="drop-shadow backdrop-blur	p-2 rounded-lg">
                                te
                              </div>
                            </CardHeader>
                            <CardHeader className="absolute z-10 bottom-1 flex-col !items-center 	 justify-items-center	">
                              <h4 className="text-gray-100 leading-5 font-medium text-large rounded-lg	 drop-shadow backdrop-blur	p-2  ">
                                {page.title}
                              </h4>
                            </CardHeader>
                            <Image
                              // onLoad={handleImageLoaded}
                              removeWrapper
                              alt="Card background"
                              className="z-0 w-full h-full object-cover h-48"
                              src={
                                page.pageIcon == ""
                                  ? "https://picsum.photos/200"
                                  : page.pageIcon.medium
                              }
                            />
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
