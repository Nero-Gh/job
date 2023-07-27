import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../components/Navbar";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "80vh",
        }}
      >
        <Box component="h1" sx={{ fontSize: "100px", textAlign: "center" }}>
          Not Found 404 😥
        </Box>

        <Button
          onClick={() => navigate(-1)}
          sx={{ backgroundColor: "#f2f2f2", color: "#1e1e1e" }}
        >
          <ArrowBackIcon />
          <Box component="span">Go to Back</Box>
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
