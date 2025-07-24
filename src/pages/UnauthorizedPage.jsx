import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        403 - Unauthorized Access
      </Typography>
      <Typography variant="body1" paragraph>
        You don't have permission to view this page.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Return to Home
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
