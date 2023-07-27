import { Avatar, Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import NavBar from "../components/Navbar";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

//validation
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.signIn);

  useEffect(() => {
    if (isAuthenticated) {
      if (userInfo.role === 1) {
        navigate("/user/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      //   alert(JSON.stringify(values, null, 2));
      dispatch(userSignInAction(values));
      action.resetForm();
    },
  });
  return (
    <>
      <NavBar />
      <Box
        onSubmit={formik.handleSubmit}
        component="form"
        className="form_style border-style"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            width: "30%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
            <LockClockOutlined />
          </Avatar>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            InputLabelProps={{ shrink: true }}
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            InputLabelProps={{ shrink: true }}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
