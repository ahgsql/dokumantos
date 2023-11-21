import { Editable, useEditor } from "@wysimark/react";
import React, { useEffect, useState } from "react";

import { Input, Select, SelectItem } from "@nextui-org/react";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { addPage } from "../hooks/addPage";
import getCategories from "../hooks/getCategories";
import { LangContext } from "../context/LangProvider";

export default function AddPage() {
  const [markdown, setMarkdown] = useState("# Hello World");
  const { t } = React.useContext(LangContext);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(false);
  const [category, setCategory] = React.useState(new Set([]));
  useEffect(() => {
    (async () => {
      let allCategories = await getCategories();
      let arr = allCategories.map((category) => {
        return { id: category._id, title: category.categoryname };
      });
      setCategories(arr);
    })();
  }, []);

  const savePage = async () => {
    const data = {
      title,
      markdown,
      category: category.currentKey,
      newCategory,
    };
    await addPage(data);
  };
  const editor = useEditor({
    minHeight: 600,
    maxWidth: 1000,
    authToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllwWkdmN2pJYTRQVEZVV2oifQ.eyJpYXQiOjE3MDAyNjE4MDIsImV4cCI6MTczMTgxOTQwMn0.fgQWGLOJ05LRGiIY_3pLhJMY1tCn7U6p5-HkPJmIaj0",
  });

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-row	gap-10 mt-10 space-between justify-center w-full ">
        <form className="mb-10 pb-4">
          <div className="space-y-12 ">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {t("Title")}
              </h2>
              <Input
                key={"primary"}
                type="text"
                color={"primary"}
                placeholder="Sayfa Başlığı"
                className="max-w-xs"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <h2 className="mt-6 text-base font-semibold leading-7 text-gray-900">
                {t("Category")} / üst sağa al
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {t("Category Description")} /yeni text yazılırsa, selecti YENİ
                Yap. Selectten yeni harici seçilirse texti boşalt modu değiş
              </p>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="w-full flex flex-row flex-wrap gap-4">
                  <Select
                    key={"primary"}
                    color={"primary"}
                    size="xs"
                    selectedKeys={category}
                    defaultSelectedKeys={["cat"]}
                    className="max-w-xs"
                    onSelectionChange={(a) => {
                      setCategory(a);
                      setNewCategory("");
                    }}
                    placeholder="Kategori Seç"
                  >
                    {categories.map((category) => {
                      return (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="text-gray-900"
                        >
                          {category.title}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </div>
                {newCategory}
                <div className="w-full flex flex-row flex-wrap gap-4">
                  <Input
                    key={"primary"}
                    type="text"
                    color={"primary"}
                    placeholder="Kategori Adı"
                    className="max-w-xs"
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                    }}
                  />
                </div>

                <div className="col-span-full ">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Dökümantasyon (MD Formatı)
                  </label>
                  <div className="mt-2 ">
                    <Editable
                      editor={editor}
                      value={markdown}
                      onChange={setMarkdown}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="reset"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={savePage}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
