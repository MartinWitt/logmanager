import { AppBar, Toolbar, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout(props: DefaultLayoutProps) {
  const { children } = props;
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      <AppBar>
        <Toolbar onClick={() => navigate("/")}>
          <ArticleIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Log Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <Toolbar />
      {children}
    </Stack>
  );
}

export default DefaultLayout;
