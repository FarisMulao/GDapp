import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Container, Dialog, Grid, TextField } from "@mui/material";

interface Props {
  children?: string;
  onClick?: () => void;
  openBool: boolean;
}

export const AdminPanel = ({ onClick, openBool, children }: Props) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [levelName, setLevelName] = React.useState("");
  const handleClickClose = () => {
    openBool = false;
  };

  return (
    <div>
      <Dialog onClose={() => (openBool = false)} open={openBool}>
        <Container fixed>
          <Box sx={{ bgcolor: "white", width: "30vw", height: "50vh" }}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                sx={{ m: 2, width: "20vw" }}
                id="outlined-basic"
                label="Level Name"
                variant="outlined"
                value={levelName}
                onChange={(e) => setLevelName(e.target.value)}
              ></TextField>
              <Button onClick={handleClickClose}>submit</Button>
            </Grid>
          </Box>
        </Container>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
