import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputBase } from "@mui/material";

const validationSchema = yup.object({
  search: yup
    .string("Enter your search keyword")
    .required("This field is required"),
});

const SearchInput = () => {
  const navigate = useNavigate();

  const OnSubmit = (values, action) => {
    //alert(values.search)
    const { search } = values;
    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate(`/`);
    }
    action.resetForm();
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: validationSchema,
    onSubmit: OnSubmit,
  });

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ margin: "10px auto" }}>
        <Box sx={{ display: "flex" }}>
          <InputBase
            sx={{ bgcolor: "white", padding: "10px" }}
            fullWidth={true}
            id="search"
            name="search"
            label="search"
            value={values.search}
            onChange={handleChange}
            placeHolder="ex: Developer , Backend, Front end"
            onBlur={handleBlur}
            error={touched.search && Boolean(errors.search)}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            Search
          </Button>
        </Box>
        <Box component="span" sx={{ color: "orange", fontSize: "30px" }}>
          {touched.search && errors.search}
        </Box>
      </form>
    </div>
  );
};

export default SearchInput;
