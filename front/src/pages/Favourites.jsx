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
  Tooltip,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getFavourites from "../hooks/getFavourites";
import { LangContext } from "../context/LangProvider";

import PageCard from "../components/PageCard";
export default function Favourites() {
  const [pages, setPages] = useState([]);
  const { t } = useContext(LangContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let pages = await getFavourites();
      setPages(pages.data);
      setIsLoading(false);
    })();
  }, []);

  const handlePageFavourite = async (id, favourited) => {
    let newPages = pages.filter((page) => {
      return page._id !== id;
    });
    setPages(newPages);
  };
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
                    {t("Favourites")}
                  </h1>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-4 gap-4">
                    {pages.map((page, i) => {
                      return (
                        <div key={i}>
                          <PageCard data={page} />;
                        </div>
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
