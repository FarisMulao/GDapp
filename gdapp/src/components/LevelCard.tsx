import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  children?: string;
  onClick?: () => void;
  difficulty?: string;
  levelId?: number;
  levelName?: string;
}

export const LevelCard = ({
  onClick,
  difficulty,
  levelId,
  levelName,
}: Props) => {
  return (
    <div>
      <Card sx={{ width: "50vw", height: "10vh" }}>
        <div>
          Difficulty Image
          <img alt="missing" src="" loading="lazy" />
        </div>
        <div>Level Name</div>
        <div>Level ID</div>
      </Card>
    </div>
  );
};

export default LevelCard;
