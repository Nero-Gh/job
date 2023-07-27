import { Box, useTheme } from "@mui/material";

const Footer = () => {
  const { palette } = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70px",
          backgroundColor: palette.secondary.midNightBlue,
        }}
      >
        <Box component="span" sx={{ color: palette.primary.main }}>
          All right reserved! 2023😊
        </Box>
      </Box>
    </>
  );
};

export default Footer;
