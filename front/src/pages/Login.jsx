import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Button, Input } from "@nextui-org/react";
export default function Login({ authSystem }) {
  const [username, setUsername] = useState("ahgsql");
  const [password, setPassword] = useState("12345Qwe_");
  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/login",
        {
          userName: username,
          password,
        },
        { withCredentials: true }
      );
      if (!result.data.error) {
        authSystem();
      }
    } catch (error) {
      console.log(error.response.status);
    }
  };
  return (
    <div className="flex justify-center">
      <form
        className="p-5 flex flex-col  gap-4 justify-center w-1/2"
        onSubmit={onFormSubmit}
      >
        <Input
          className="w-full"
          label="Kullanıcı Adı"
          color="primary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          color="primary"
          label="Şifre"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="primary" variant="shadow" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
