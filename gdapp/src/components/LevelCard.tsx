import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import normal from "./images/normal-difficulty-geometry-dash.jpg";

interface Props {
  children?: string;
  onClick?: () => void;
  difficulty: number;
  levelId?: number;
  levelName?: string;
  distinction?: string;
}

export const LevelCard = ({
  onClick,
  difficulty,
  levelId,
  levelName,
  distinction,
}: Props) => {
  let myMap = new Map<number, string>([
    [1, "Auto"],
    [2, "Easy"],
    [3, "Normal"],
    [4, "Hard"],
    [5, "Hard"],
    [6, "Harder"],
    [7, "Harder"],
    [8, "Insane"],
    [9, "Insane"],
    [10, "Demon"],
  ]);
  return (
    <div>
      <Button onClick={() => console.log("hello")}>
        <Card
          sx={{
            display: "flex",
            width: "30vw",
            height: "25vh",
            pl: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              sx={{ width: "10vh", p: 2 }}
              image={normal}
              alt="difficulty face"
            />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {myMap.get(difficulty)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {difficulty}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "30vw",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Level Name
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Level ID
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Button>
    </div>
  );
};

export default LevelCard;
