import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Link,
  Skeleton,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import urlSlug from "url-slug";
import { AddIcon } from "../components/icons/AddIcon";
import { CheckIcon } from "../components/icons/CheckIcon";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import getCategories from "../hooks/getCategories";

import { addCategory } from "../hooks/addCategory";
import { removeCategory } from "../hooks/removeCategory";
import { updateCategory } from "../hooks/updateCategory";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  let nameRefs = useRef({});
  let slugRefs = useRef({});
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [slug, setSlug] = useState("");
  const [showImages, setShowImages] = useState(false);
  const [total, setTotal] = useState(0);
  let ta = 0;
  const getAllCategories = async () => {
    let allCategories = await getCategories();
    let arr = allCategories.map((category) => {
      return {
        id: category._id,
        title: category.categoryname,
        slug: category.slug,
        image:
          category.catImage == ""
            ? "https://picsum.photos/200"
            : import.meta.env.VITE_BASE_URL + "/" + category.catImage,
      };
    });
    setCategories(arr);
    setTotal(arr.length);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllCategories();
  }, [name]);

  const categoryAddHandler = async () => {
    setIsLoading(true);
    if (name.length > 0 && slug.length > 0) {
      await addCategory(name, slug);
      getAllCategories();
    } else {
      toast.error("Kategori İsmi / Slug Giriniz");
      setIsLoading(false);
    }
  };
  setTimeout(() => {
    console.log(nameRefs.current);
  }, 2500);
  const update = async (id) => {
    let data = {
      categoryname: nameRefs.current[id].value,
      slug: slugRefs.current[id].value,
    };
    let res = await updateCategory(id, data);
    if (res.success) {
      toast.success("Kategori Güncellendi");
    }
  };
  const remove = async (id) => {
    let res = await removeCategory(id);
    if (res.success) {
      toast.success(
        "Kategori Silindi, İçindeki Sayfalar Kategorisiz Olarak İşaretlendi"
      );
      navigate(0);
    }
  };

  const handleImageLoaded = () => {
    ta++;
    if (ta == total) {
      setShowImages(true);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-row	gap-10 mt-10 space-between justify-center w-full  ">
        <div className="flex flex-col max-w-2xl">
          <div></div>
          <Tabs aria-label="Options">
            <Tab key="icerik" title="İçerik">
              <Card>
                <CardBody>
                  {isLoading ? (
                    <div className="columns-3 justify-center flex mb-10 mt-10">
                      <Spinner></Spinner>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      {categories.map((category, i) => {
                        return (
                          <div key={i}>
                            <Card
                              style={{
                                display: showImages ? "none" : "block",
                              }}
                              className="w-[200px] space-y-5 "
                              radius="lg"
                            >
                              <Skeleton className="rounded-lg">
                                <div className="h-44 rounded-lg bg-default-300"></div>
                              </Skeleton>
                            </Card>
                            <Card
                              style={{
                                display: showImages ? "block" : "none",
                              }}
                            >
                              <Link href={"/category/" + category.slug}>
                                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                  <h4 className="text-white font-medium text-large drop-shadow">
                                    {category.title}
                                  </h4>
                                </CardHeader>

                                <Image
                                  onLoad={handleImageLoaded}
                                  removeWrapper
                                  alt="Card background"
                                  className="z-0 w-full h-full object-cover"
                                  src={category.image}
                                />
                              </Link>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardBody>
              </Card>
            </Tab>
            <Tab key="duzenle" title="Düzenle">
              <Card>
                <CardBody>
                  <form className="mb-10 pb-4">
                    <div>
                      <div className="columns-3 border-b border-gray-900/10 mb-7">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Kategori Adı
                        </h2>

                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Slug
                        </h2>

                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          İşlemler
                        </h2>
                      </div>
                      <div className="columns-3  border-b pb-2">
                        <Input
                          type="text"
                          color={"secondary"}
                          radius="none"
                          placeholder="Yeni Kategori Adı"
                          value={name}
                          className="max-w-xl"
                          onChange={(e) => {
                            setName(e.target.value);
                            setSlug(urlSlug(e.target.value));
                          }}
                        />
                        <Input
                          radius="none"
                          type="text"
                          color={"secondary"}
                          placeholder="Yeni Kategori Slugu"
                          value={slug}
                          className="max-w-xl"
                          onChange={(e) => {
                            setSlug(e.target.value);
                          }}
                        />
                        <Button
                          onClick={categoryAddHandler}
                          isIconOnly
                          color="secondary"
                        >
                          <AddIcon />
                        </Button>
                      </div>
                      {isLoading ? (
                        <div className="columns-3 justify-center flex mt-10">
                          <Spinner size="lg" />
                        </div>
                      ) : (
                        categories.map((category, index) => {
                          return (
                            <div className="columns-3 mt-2" key={index}>
                              <Input
                                ref={(element) =>
                                  (nameRefs.current[category.id] = element)
                                }
                                type="text"
                                radius="sm"
                                color={"primary"}
                                defaultValue={category.title}
                                className="max-w-xl"
                              />
                              <Input
                                radius="sm"
                                ref={(element) =>
                                  (slugRefs.current[category.id] = element)
                                }
                                type="text"
                                color={"primary"}
                                defaultValue={category.slug}
                                className="max-w-xl"
                              />
                              <Button
                                onClick={() => {
                                  update(category.id);
                                }}
                                isIconOnly
                                color="success"
                              >
                                <CheckIcon />
                              </Button>{" "}
                              <Button
                                onClick={() => {
                                  remove(category.id);
                                }}
                                isIconOnly
                                color="danger"
                              >
                                <DeleteIcon />
                              </Button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
