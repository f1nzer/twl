import { Button } from "@mui/material";
import { QuestionStorage } from "../../services/QuestionStorage";
import { ChangeEvent } from "react";

export const LoadQuestionButton = () => {
  const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (!e.target) {
        return;
      }

      const text = e.target.result;
      if (!text) {
        return;
      }

      console.log(text);
      QuestionStorage.loadQuestions(text.toString());
    };

    reader.readAsText(e.target.files[0]);
  };

  return (
    <Button
      variant="contained"
      component="label"
      size="large"
      sx={{ textAlign: "center" }}
    >
      Загрузить вопросы
      <input type="file" hidden accept=".csv" onChange={(e) => onLoadFile(e)} />
    </Button>
  );
};
