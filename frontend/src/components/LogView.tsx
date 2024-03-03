import {
  Configuration,
  DockerServicesControllerApi,
  EntityModelDockerLogs,
  EntityModelDockerService,
} from "../rest";
import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  LinearProgress,
  Card,
  CardContent,
  Paper,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Error } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
const dockerServicesApi = new DockerServicesControllerApi(
    new Configuration({
      basePath: "",
    }),
);

function FlipButton(props: { onClick: () => void }) {
  return (
    <Button
      onClick={props.onClick}
      sx={{
        backgroundColor: "white",
        marginBottom: "10px",
        alignSelf: "center",
        "&:hover": {
          backgroundColor: "grey", // change this to desired hover color
        },
      }}
    >
      Flip Logs
    </Button>
  );
}

function SearchKindSelection(props: {
  value: string;
  onChange: (event: any) => void;
}) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={props.value}
        onChange={props.onChange}
        color="secondary"
        sx={{
          "& .MuiSelect-select": {
            color: "white",
          },
        }}
      >
        <MenuItem value="fulltext" sx={{ color: "blue" }}>
          Full Text
        </MenuItem>
        <MenuItem value="ignorecase" sx={{ color: "blue" }}>
          Ignore Case
        </MenuItem>
        <MenuItem value="regex" sx={{ color: "blue" }}>
          Regular Expression
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function SearchInput(props: { value: string; onChange: (event: any) => void }) {
  return (
    <TextField
      value={props.value}
      onChange={props.onChange}
      label="Search logs"
      color="secondary"
      sx={{
        "& .MuiFormLabel-root": {
          color: "white",
        },
        "& .MuiInputBase-input": {
          color: "white",
        },
      }}
    />
  );
}

function ServiceInfoCard(props: {
  entityModelDockerService: EntityModelDockerService;
}) {
  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: "#424242", marginBottom: "10px" }}
    >
      <CardContent>
        <Stack direction={"column"} alignItems={"flex-start"}>
          <Typography variant="body1" align={"center"}>
            <ListAltOutlinedIcon /> Service Names:{" "}
            {props.entityModelDockerService.names?.join(", ")}
          </Typography>
          <Typography variant="body1" align={"center"}>
            <VpnKeyIcon /> Service ID: {props.entityModelDockerService.id}
          </Typography>
          <Typography variant="body1" align={"center"}>
            <CheckCircleOutlineIcon /> Service State:{" "}
            {props.entityModelDockerService.status}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

function LogViewer() {
  const [log, setLog] = useState<EntityModelDockerLogs>({});
  const [filteredLog, setFilteredLog] = useState("");
  const [entityModelDockerService, setEntityModelDockerService] =
    useState<EntityModelDockerService>({});
  let { serviceId } = useParams();
  const [flipLog, setFlipLog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("fulltext");

  if (!serviceId) {
    return (
      <Box alignContent={"flex-start"}>
        <Error />
        <Typography variant="h4">No service ID provided</Typography>
      </Box>
    );
  }

  useEffect(() => {
    dockerServicesApi
      .one(serviceId!)
      .then((response) => {
        setEntityModelDockerService(response.data);
      })
      .then(() => {
        dockerServicesApi.logs(serviceId!).then((response) => {
          setLog(response.data);
        });
      });
  }, [serviceId]);

  useEffect(() => {
    if (!log.logs) return setFilteredLog("");

    let filtered;
    switch (searchType) {
      case "fulltext":
        filtered = log.logs
          .split("\n")
          .filter((line) => line.includes(searchTerm));
        break;
      case "ignorecase":
        filtered = log.logs
          .split("\n")
          .filter((line) =>
            line.toLowerCase().includes(searchTerm.toLowerCase()),
          );
        break;
      case "regex":
        const regex = new RegExp(searchTerm, "g");
        filtered = log.logs.split("\n").filter((line) => line.match(regex));
        break;
      default:
        break;
    }
    setFilteredLog(filtered?.join("\n") || "");
  }, [searchTerm, log, searchType]);

  if (!log.logs) {
    return (
      <>
        <Box alignContent={"center"}>
          <LinearProgress />
        </Box>
      </>
    );
  }

  const handleFlip = () => setFlipLog(!flipLog);
  const handleSearch = (event: any) => setSearchTerm(event.target.value);
  const handleSearchType = (event: any) => setSearchType(event.target.value);

  let logLines = filteredLog.split("\n");
  if (flipLog) {
    logLines = logLines.reverse();
  }

  return (
    <>
      <Typography variant="h4" align={"center"} padding={"10"}>
        {entityModelDockerService.names?.join(", ")}
      </Typography>
      <ServiceInfoCard entityModelDockerService={entityModelDockerService} />
      <Stack direction="row" justifyContent="center" alignItems="center">
        <SearchInput value={searchTerm} onChange={handleSearch} />
        <SearchKindSelection value={searchType} onChange={handleSearchType} />
        <FlipButton onClick={handleFlip} />
      </Stack>
      <List>
        <Paper sx={{ backgroundColor: "#303030" }}>
          {logLines.map((line, ind) => (
            <ListItem key={ind}>
              <Typography color={"white"}>{line}</Typography>
            </ListItem>
          ))}
        </Paper>
      </List>
    </>
  );
}

export default LogViewer;
