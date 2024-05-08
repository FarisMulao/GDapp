import * as React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  low?: string;
  high?: string;
}

export const LevelFilter = ({ low, high }: Props) => {
  const [lowData, setLowData] = useState(low);
  const [highData, setHighData] = useState(high);

  return (
    <div>
      <TextField
        sx={{ m: 2, width: "20vw" }}
        id="outlined-basic"
        label="Difficulty Low"
        variant="outlined"
        value={lowData}
        onChange={(e) => setLowData(e.target.value)}
      ></TextField>

      <TextField
        sx={{ m: 2, width: "20vw" }}
        id="outlined-basic"
        label="Difficulty High"
        variant="outlined"
        value={highData}
        onChange={(e) => setHighData(e.target.value)}
      ></TextField>
    </div>
  );
};

export default LevelFilter;
