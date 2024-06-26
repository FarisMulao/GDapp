import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import faces from "./images/difficulty-faces.png";
import { CroppedImage } from "./CroppedImage";

interface Props {
  children?: string;
  onClick?: () => void;
  difficulty?: number;
  levelId?: string;
  levelName?: string;
  distinction?: string;
  creatorUsername?: string;
  length?: number;
  wrUsername?: string;
  wrTime?: number;
  avgTime?: number;
  isPlatformer?: number;
  songs: { artistName: string; songName: string }[];
  avgEnjoyment?: number;
}

export const LevelInfo = ({
  onClick,
  difficulty,
  levelId,
  levelName,
  distinction,
  creatorUsername,
  length,
  wrUsername,
  wrTime,
  isPlatformer,
  songs,
  avgEnjoyment,
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
    [10, [1025, 910]],
  ]);
  let lengthMap = new Map<number | null, string>([
    [0, "Tiny"],
    [1, "Short"],
    [2, "Medium"],
    [3, "Long"],
    [4, "XL"],
    [5, "PLAT"],
  ]);

  let tempLength: number = -1;

  if (length === undefined || length === null) {
    tempLength = 5;
  } else {
    tempLength = length;
  }
  let temp: any = difficulty;
  let CX: any = imageMap.get(temp);
  let type = "";
  if (isPlatformer === 1) {
    type = "Platformer";
    tempLength = 5;
  } else if (isPlatformer === 0) {
    type = "Normal";
  }
  console.log(isPlatformer);
  return (
    <div>
      <Card
        sx={{
          display: "flex",
          width: "80vw",
          height: "60vh",
          pl: 2,
          bgcolor: "#342F31",
          mt: 5,
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
          <Typography
            variant="h5"
            color="#F3BB3B"
            component="div"
            align="center"
          >
            {myMap.get(temp)}
          </Typography>
          <Typography
            variant="h5"
            color="#F3BB3B"
            component="div"
            align="center"
          >
            {temp} Star
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "70vw",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h3" sx={{ color: "#F3BB3B" }}>
              {levelName} By {creatorUsername}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              component="div"
              sx={{ color: "#F3BB3B" }}
            >
              ID: {levelId}
              <br />
              Enjoyment: {avgEnjoyment}
              <br />
              WR:
              {isPlatformer === 1 ? (
                <>
                  {wrTime} Seconds By {wrUsername}
                </>
              ) : (
                ` Not Available`
              )}
              <br />
              Type: {type}
              <br />
              Length: {lengthMap.get(tempLength)}
            </Typography>
            <Box sx={{ mt: "15vh" }}>
              <Typography
                variant="h4"
                color="text.secondary"
                component="div"
                sx={{ color: "#F3BB3B" }}
              >
                Song{songs.length > 1 ? "s" : ""}:{" "}
                {songs
                  .map((e) => `${e.songName} by ${e.artistName}`)
                  .join(", ")}
                {songs.length === 0 ? "None" : ""}
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default LevelInfo;
