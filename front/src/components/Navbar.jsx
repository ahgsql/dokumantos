import {
  Button,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { useLocation } from "react-router-dom";
import { AddIcon } from "../components/icons/AddIcon";
export default function Nav() {
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
            Kategoriler
          </Link>
        </NavbarItem>
        <NavbarItem isActive={currentpath == "pages"}>
          <Link
            href="/pages"
            color={currentpath == "pages" ? "primary" : "foreground"}
          >
            Sayfalar
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/add">
            <Button color="danger">
              Yeni Sayfa
              <AddIcon />
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Input
            label="Search"
            value={value}
            onValueChange={setValue}
            labelPlacement="outside-left"
          />
        </NavbarItem>
        <p className="text-default-500 text-small">Input value: {value}</p>
      </NavbarContent>
    </Navbar>
  );
}
