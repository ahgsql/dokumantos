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
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getFavourites from "../hooks/getFavourites";
import { LangContext } from "../context/LangProvider";
import { HeartFilled } from "../components/icons/HeartFilled";
import { HeartEmpty } from "../components/icons/HeartEmpty";
import { Click } from "../components/icons/Click";
import { changePageFavourited } from "../hooks/changePageFavourited";
import { useNavigate } from "react-router-dom";
export default function Favourites() {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();
  const { t } = useContext(LangContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let pages = await getFavourites();
      setPages(pages.data);
      setIsLoading(false);
    })();
  }, []);
  const handlePageClick = (slug) => {
    navigate("/page/" + slug);
  };
  const handlePageFavourite = async (id, favourited) => {
    await changePageFavourited(id, favourited);
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
                        <Card key={i} className="w-full">
                          <Link
                            href="#"
                            onClick={() => handlePageClick(page.slug)}
                          >
                            <CardHeader className="absolute z-10 top-0 flex-col !items-end	">
                              <div className="drop-shadow backdrop-blur-sm	p-1 rounded-lg columns-2">
                                <Tooltip
                                  content={page.clickCount}
                                  showArrow={true}
                                  color="danger"
                                  offset={5}
                                  delay={0}
                                >
                                  <h1>
                                    <Click />
                                  </h1>
                                </Tooltip>
                                <div
                                  className="hover:scale-125 transform transition duration-150"
                                  onClick={async (e) => {
                                    let ref = e.target.closest("div");
                                    ref.style.pointerEvents = "none";
                                    ref.style.opacity = 0.2;
                                    e.stopPropagation();
                                    await handlePageFavourite(
                                      page._id,
                                      !page.favourited
                                    );

                                    ref.style.pointerEvents = "unset";
                                    ref.style.opacity = 1;
                                  }}
                                >
                                  {page.favourited ? (
                                    <HeartFilled />
                                  ) : (
                                    <HeartEmpty />
                                  )}
                                </div>
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
