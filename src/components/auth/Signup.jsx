import React from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, handleSignUp } = useSignUpWithEmailAndPassword();
  return (
    <>
      <Input
        placeholder="Fullname"
        type="text"
        fontSize={"14"}
        value={inputs.fullname}
        onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
      />
      <Input
        placeholder="Username"
        type="text"
        fontSize={"14"}
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        placeholder="Email"
        type="email"
        fontSize={"14"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          fontSize={"14"}
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <InputRightElement h={"full"}>
          <Button
            h={"full"}
            size={"sm"}
            bg={"transparent"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Button
        w={"full"}
        colorScheme={"blue"}
        fontSize={14}
        size={"sm"}
        isLoading={loading}
        onClick={() => handleSignUp(inputs)}
      >
        Signup
      </Button>
    </>
  );
};

export default Signup;
