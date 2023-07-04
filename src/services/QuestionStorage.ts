import { Question } from "../models/player";

let questionList: Question[] = [];
let lastQuestionIndex = -1;

const dummyQuestion: Question = {
  text: "No questions loaded",
  answer: "No questions loaded",
};

const shuffleQuestions = (questions: Question[]) => {
  return questions
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const getNext = (): Question => {
  if (!questionList.length) {
    return dummyQuestion;
  }

  lastQuestionIndex = (lastQuestionIndex + 1) % questionList.length;
  return questionList[lastQuestionIndex];
};

const getCurrent = (): Question => {
  if (!questionList.length) {
    return dummyQuestion;
  }

  return questionList[lastQuestionIndex];
};

const loadQuestions = (data: string) => {
  const lines = data.split(/\r?\n/);
  const questions = lines
    .filter((x) => x.trim().length > 0)
    .map((x) => x.split(";"))
    .map((x) => ({ text: x[0].trim(), answer: x[1].trim() }));

  if (!questions.length) {
    return;
  }

  questionList = shuffleQuestions(questions);
};

const isQuestionsLoaded = () => {
  return questionList.length > 0;
};

export const QuestionStorage = {
  getNext,
  getCurrent,
  loadQuestions,
  isQuestionsLoaded,
};
