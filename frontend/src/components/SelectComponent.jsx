import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

export default function SelectCategory({ handleChangeCategory, cat }) {
  const { jobtype } = useSelector((state) => state.jobtype);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cat}
          label="Category"
          onChange={handleChangeCategory}
        >
          <MenuItem value="">All</MenuItem>
          {jobtype &&
            jobtype.map((items) => (
              <MenuItem key={items._id} value={items._id}>
                {items.jobTypeName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
