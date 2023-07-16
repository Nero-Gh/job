import { Box } from "@mui/material";
import Header from "../components/Header";
import NavBar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Box sx={{ bgColor: "#fafafa", minHeight: "100vh " }}>
        <NavBar />
        <Header />
      </Box>
      <h1>Home</h1>
    </>
  );
};

export default Home;
