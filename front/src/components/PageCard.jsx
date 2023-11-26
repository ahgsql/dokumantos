import React, { useState } from "react";
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
import { HeartFilled } from "../components/icons/HeartFilled";
import { HeartEmpty } from "../components/icons/HeartEmpty";
import { Click } from "../components/icons/Click";
import { changePageFavourited } from "../hooks/changePageFavourited";
import { useNavigate } from "react-router-dom";
export default function PageCard(props) {
  console.log("page", props.data._id);
  let { data } = props;
  const [page, setPage] = useState(data);
  const handlePageFavourite = async (id, favourited) => {
    await changePageFavourited(id, favourited);
    setPage({ ...page, favourited: !page.favourited });
  };
  const navigate = useNavigate();
  const handlePageClick = (slug) => {
    navigate("/page/" + slug);
  };

  return (
    <Card key={props.key} className="w-full">
      <Link href="#" onClick={() => handlePageClick(page.slug)}>
        <CardHeader className="absolute z-10 top-0 flex-col !items-end	">
          <div className="drop-shadow backdrop-blur-sm	p-1 rounded-lg columns-2">
            <Tooltip
              content={page.clickCount ?? 1}
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
                await handlePageFavourite(page._id, !page.favourited);

                ref.style.pointerEvents = "unset";
                ref.style.opacity = 1;
              }}
            >
              {page.favourited ? <HeartFilled /> : <HeartEmpty />}
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
}
