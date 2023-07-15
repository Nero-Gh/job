import { Box, Typography, styled } from "@mui/material";
import React from "react";

const Header = () => {
  const StyleHeader = styled(Box)(({ theme }) => ({
    padding: "10px",
    minHeight: "200px",
    display: "flex",
    alighItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2ff",
  }));
  return (
    <>
      <StyleHeader>
        <Typography
          variant="h1"
          component="h1"
          align="center"
          marginTop={3}
          sx={{
            fontWeight: "700",
          }}
        >
          Job Portal
        </Typography>
      </StyleHeader>
    </>
  );
};

export default Header;
