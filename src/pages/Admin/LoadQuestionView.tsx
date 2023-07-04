import { QuestionStorage } from "../../services/QuestionStorage";
import { ChangeEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";

const reader = new FileReader();

export const LoadQuestionView = () => {
  const [loading, setLoading] = useState(false);

  const onLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setLoading(true);
    reader.onload = async (e) => {
      if (!e.target) {
        return;
      }

      const text = (e.target.result)
      setLoading(false);
      if (!text) {
        return;
      }

      console.log(text);
      QuestionStorage.loadQuestions(text.toString());
    };

    reader.readAsText(e.target.files[0]);
  }

  return <LoadingButton
    variant="contained"
    component="label"
    size="large"
    loading={loading}
  >
    Загрузить вопросы
    <input
      type="file"
      hidden
      accept=".csv"
      onChange={(e) => onLoadFile(e)}
    />
  </LoadingButton>
} 