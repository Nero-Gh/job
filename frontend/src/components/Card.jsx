import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function BasicCard({
  title,
  description,
  location,
  cat,
  id,
  link,
}) {
  const { palette } = useTheme();
  return (
    <Card sx={{ minWidth: 275, mt: 2, textAlign: "left" }} key={id}>
      <CardContent>
        <Typography
          sx={{
            fontSize: 15,
            color: palette.secondary.main,
            fontWeight: "500",
          }}
          //   color="text.secondary"
          //   gutterBottom
        >
          <IconButton
            sx={{
              color: palette.secondary.main,
              fontSize: 15,
              textTransform: "capitalize",
            }}
          >
            <LocationOnIcon />
            {location}
          </IconButton>
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {cat}
        </Typography>
        <Typography variant="body2">
          Description: {description.split(" ").slice(0, 10).join(" ") + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          style={{
            backgroundColor: palette.secondary.main,
            display: "flex",

            alignItems: "center",
          }}
        >
          <VisibilityIcon
            sx={{ color: palette.secondary.white, mr: 1 }}
            fontSize="small"
          />
          <Link
            to={link}
            style={{ textDecoration: "none", color: palette.secondary.white }}
          >
            Learn More
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
