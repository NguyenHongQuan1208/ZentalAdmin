import React from "react";
import { Login, LoginForm } from "react-admin";
import { Typography, Card, CardContent } from "@mui/material";

const CustomLoginForm = () => (
  <Card sx={{ minWidth: 300 }}>
    <CardContent>
      <Typography variant="h5" component="h2" gutterBottom textAlign={"center"}>
        Đăng nhập hệ thống
      </Typography>
      <LoginForm />
    </CardContent>
  </Card>
);

const LoginPage = () => (
  <Login backgroundImage="https://source.unsplash.com/random/1600x900/?admin">
    <CustomLoginForm />
  </Login>
);

export default LoginPage;
