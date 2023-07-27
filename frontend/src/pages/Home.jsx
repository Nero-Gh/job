import {
  Box,
  Card,
  Container,
  ListItemIcon,
  MenuItem,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { jobLoadAction } from "../redux/actions/jobAction";
import { Link, useParams } from "react-router-dom";
import BasicCard from "../components/Card";
import LoadingBox from "../components/LoadingBox";
import SelectCategory from "../components/SelectComponent";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
import { LocationIconOn } from "@mui/icons-material/LocationOn";

const Home = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { keyword, location } = useParams();
  const [cat, setCat] = useState("");
  const [page, setPage] = useState(1);
  const { jobs, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadJob
  );

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location]);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  let handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  return (
    <>
      <Box sx={{ bgColor: "#fafafa", minHeight: "100vh " }}>
        <NavBar />
        <Header />
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 1, p: 2 }}>
              <Card sx={{ minWidth: 150, mt: 3, mb: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main }}
                  >
                    Filter job by category
                  </Typography>
                </Box>
                <SelectCategory
                  handleChangeCategory={handleChangeCategory}
                  cat={cat}
                />
              </Card>
              <Card sx={{ minWidth: 150, mt: 3, mb: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main }}
                  >
                    Filter job by Location
                  </Typography>
                </Box>
                {setUniqueLocation &&
                  setUniqueLocation.map((location, i) => (
                    <MenuItem key={i}>
                      <ListItemIcon>
                        <LocationIconOn
                          sx={{ color: palette.secondary.main }}
                        />
                        <Link to={`/search/location/${location}`}>
                          {location}
                        </Link>
                      </ListItemIcon>
                    </MenuItem>
                  ))}
              </Card>
            </Box>
            <Box sx={{ flex: 2, p: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : jobs && jobs.length === 0 ? (
                <>
                  <Box
                    sx={{
                      minHeight: 500,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2>No result found</h2>
                  </Box>
                </>
              ) : (
                jobs &&
                jobs.map((items) => (
                  <BasicCard
                    key={items._id}
                    title={items.title}
                    description={items.description}
                    location={items.location}
                    cat={
                      items.JobType ? items.JobType.jobTypeName : "No category"
                    }
                    link={`/job/${items._id}`}
                  />
                ))
              )}
              <Stack spacing={2} mt="15px" mx="auto">
                <Pagination
                  page={page}
                  count={pages === 0 ? 1 : pages}
                  onChange={(e, value) => setPage(value)}
                ></Pagination>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
