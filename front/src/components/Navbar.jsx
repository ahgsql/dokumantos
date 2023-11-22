import {
  Button,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AddIcon } from "../components/icons/AddIcon";
import { LangContext } from "../context/LangProvider";

/**
 * Navbar component that renders site navigation.
 *
 * Uses React context to get translation, language, and language setter functions.
 * Renders nav links, search input, add page button, and language selector.
 * Nav links highlighted based on current URL path.
 * Language selector defaults to current language from context.
 * Handles language change by calling context setter function.
 */
export default function Nav() {
  const { t, langs, setLang, lang } = React.useContext(LangContext);

  const [value, setValue] = React.useState("");
  const location = useLocation();
  let currentpath = location.pathname.slice(1, 500);
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" color={currentpath == "" ? "primary" : "foreground"}>
          <p className="font-bold text-inherit">Dökümantos</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className=" sm:flex gap-4" justify="start">
        <NavbarItem isActive={currentpath == "categories"}>
          <Link
            color={currentpath == "categories" ? "primary" : "foreground"}
            href="/categories"
          >
            {t("Categories")}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={currentpath == "pages"}>
          <Link
            href="/pages"
            color={currentpath == "pages" ? "primary" : "foreground"}
          >
            {t("Pages")}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent>
        <NavbarItem>
          <Link href="/add">
            <Button color="danger">
              {t("New Page")}
              <AddIcon />
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Input
            label={t("Search")}
            value={value}
            onValueChange={setValue}
            labelPlacement="outside-left"
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="w-full">
        <Select
          label={t("Select Language")}
          className="max-w-xs"
          onChange={(event) => {
            if (event.target.value == "") return;
            setLang(event.target.value);
          }}
          defaultSelectedKeys={[lang]}
        >
          {Object.keys(langs).map((langKey, index) => {
            let lang = langs[langKey];
            return (
              <SelectItem key={lang.data.code} value={lang.data.code}>
                {lang.data.name_in_own_language}
              </SelectItem>
            );
          })}
        </Select>
      </NavbarContent>
    </Navbar>
  );
}
