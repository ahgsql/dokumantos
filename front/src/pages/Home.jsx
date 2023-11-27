import React, { useEffect, useState } from "react";

import Markdown from "react-markdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LangContext } from "../context/LangProvider";
import {
  Card,
  CardBody,
  CircularProgress,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import getRecent from "../hooks/getRecent";
import getMostVisited from "../hooks/getMostVisited";
import getFavourites from "../hooks/getFavourites";
import { randomIntFromInterval } from "../hooks/utils";
import PageCardHome from "../components/PageCardHome";
import getCategories from "../hooks/getCategories";
export default function Home() {
  const { t } = React.useContext(LangContext);
  const [pages, setPages] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    (async () => {
      setProgress(randomIntFromInterval(0, 10));
      let categ = await getCategories();
      setCategories(categ);
      setProgress(randomIntFromInterval(10, 21));
      let lPages = await getRecent();
      setProgress(randomIntFromInterval(22, 40));
      let sPages = await getFavourites();
      setProgress(randomIntFromInterval(43, 65));
      let fPages = await getFavourites();
      setProgress(randomIntFromInterval(67, 83));
      let mClickedPages = await getMostVisited();
      setProgress(randomIntFromInterval(83, 95));
      setPages({
        latest: lPages.data,
        suggested: sPages.data,
        favourited: fPages.data,
        mostClicked: mClickedPages.data,
      });
      setProgress(100);
      setIsLoading(false);
    })();
  }, []);

  const catIdToDetails = (id) => {
    return categories.find((cat) => cat._id === id);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col mt-10 space-between justify-center items-center w-full">
        {isLoading ? (
          <div className="columns-5 justify-center flex mt-10 w-4/5">
            <CircularProgress
              classNames={{
                svg: "w-60 h-60 drop-shadow-md",
                track: "stroke-gray-300",
                value: "text-5xl text-black",
              }}
              value={progress}
              strokeWidth={5}
              showValueLabel={true}
            />
          </div>
        ) : (
          <Tabs aria-label="Dash">
            <Tab key="latest" title={t("Latest")} className=" max-w-2xl">
              <Card>
                <CardBody className="bg-gradient-to-r from-pink-100 via-blue-400 to-rose-300">
                  <div className="grid grid-cols-1 gap-4 ">
                    {pages.latest.map((page, i) => {
                      return (
                        <div key={i}>
                          <PageCardHome
                            data={page}
                            category={catIdToDetails(page.categoryId)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="suggested" title={t("Suggested")} className=" max-w-2xl">
              <Card>
                <CardBody className="bg-gradient-to-r from-pink-100 via-blue-400 to-rose-300">
                  <div className="grid grid-cols-1 gap-4 ">
                    {pages.suggested.map((page, i) => {
                      return (
                        <div key={i}>
                          <PageCardHome
                            data={page}
                            category={catIdToDetails(page.categoryId)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="f" title={t("Favourites")} className=" max-w-2xl">
              <Card>
                <CardBody className="bg-gradient-to-r from-pink-100 via-blue-400 to-rose-300">
                  <div className="grid grid-cols-1 gap-4 ">
                    {pages.favourited.map((page, i) => {
                      return (
                        <div key={i}>
                          <PageCardHome
                            data={page}
                            category={catIdToDetails(page.categoryId)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="m" title={t("Most Clicked")} className=" max-w-2xl">
              <Card>
                <CardBody className="bg-gradient-to-r from-pink-100 via-blue-400 to-rose-300">
                  <div className="grid grid-cols-1 gap-4 ">
                    {pages.mostClicked.map((page, i) => {
                      return (
                        <div key={i}>
                          <PageCardHome
                            data={page}
                            category={catIdToDetails(page.categoryId)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        )}
      </div>
    </div>
  );
}
