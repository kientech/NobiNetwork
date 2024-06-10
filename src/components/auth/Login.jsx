import React from "react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { handleLogin, loading } = useLogin();
  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        fontSize={"14"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Password"
        type="password"
        fontSize={"14"}
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      <Button
        w={"full"}
        colorScheme={"blue"}
        fontSize={14}
        size={"sm"}
        isLoading={loading}
        onClick={() => handleLogin(inputs)}
      >
        Login
      </Button>
    </>
  );
};

export default Login;
