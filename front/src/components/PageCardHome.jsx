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
export default function PageCardHome(props) {
  let { data, category } = props;
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
    <Card
      radius="sm"
      fullWidth={true}
      classNames={{
        body: " ",
      }}
      isBlurred
      className=" border-none bg-background/60 dark:bg-default-100/50 w-[610px] max-w-2xl shadow-medium "
      shadow="sm"
    >
      <Link
        href=""
        onClick={() => handlePageClick(page.slug)}
        color="foreground"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span- md:col-span-2">
              <Image
                alt="Album cover"
                className="object-cover h-14 "
                shadow="sm"
                src={
                  page.pageIcon == ""
                    ? "https://picsum.photos/200"
                    : page.pageIcon.medium
                }
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <p className="text-small text-foreground/80">
                    {category.categoryname}
                  </p>
                  <h1 className="text-large font-medium mt-2">{page.title}</h1>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Link>
    </Card>
  );
}
