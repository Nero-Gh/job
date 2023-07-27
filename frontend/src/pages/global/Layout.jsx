// import React, { Component } from "react";
// import HeaderTop from "./HeaderTop";
// import SidebarAdmin from "./Sidebar";
// import { Box } from "@mui/material";

// const Layout = ({ ...props }) => {
//   return (
//     <>
//       <Box component="div" style={{ display: "flex", minHeight: "100vh" }}>
//         <SidebarAdmin />
//         <Box sx={{ width: "100%", bgcolor: "#002952" }}>
//           <HeaderTop />
//           <Box>
//             <Component {...props} />
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Layout;

import { Box } from "@mui/material";
import React from "react";
import HeaderTop from "./HeaderTop";
import SidebarAdm from "./Sidebar";

const Layout =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <SidebarAdm />
          <Box sx={{ width: "100%", bgcolor: "#002952" }}>
            <HeaderTop />
            <Box sx={{ p: 3 }}>
              <Component {...props} />
            </Box>
          </Box>
        </div>
      </>
    );
  };

export default Layout;
