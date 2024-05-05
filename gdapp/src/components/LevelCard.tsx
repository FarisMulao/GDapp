import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import faces from "./images/difficulty-faces.png";
import { CroppedImage } from "./CroppedImage";

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
  let imageMap = new Map<number, Array<number>>([
    [1, [10, 250]],
    [2, [10, 470]],
    [3, [10, 915]],
    [4, [10, 1140]],
    [5, [10, 1140]],
    [6, [10, 1360]],
    [7, [10, 1360]],
    [8, [1020, 25]],
    [9, [1020, 25]],
    [10, [1030, 910]],
  ]);
  let CX: any = imageMap.get(difficulty);
  return (
    <div>
      <Button onClick={() => console.log("hello")} sx={{}}>
        <Card
          sx={{
            display: "flex",
            width: "30vw",
            height: "25vh",
            pl: 2,
            bgcolor: "#342F31",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CroppedImage
              difficulty2={1}
              imageSource={faces}
              cropX={CX[0]}
              cropY={CX[1]}
              cropWidth={165}
              cropHeight={160}
            ></CroppedImage>
            <Typography variant="subtitle1" color="#F3BB3B" component="div">
              {myMap.get(difficulty)}
            </Typography>
            <Typography variant="subtitle1" color="#F3BB3B" component="div">
              {difficulty} Star
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
              <Typography
                component="div"
                variant="h5"
                sx={{ color: "#F3BB3B" }}
              >
                Level Name
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                sx={{ color: "#F3BB3B" }}
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
