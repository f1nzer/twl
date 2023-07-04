import arrayShuffle from "array-shuffle";

const questionList: string[] = [];

let lastQuestionIndex: number;
let alreadyUsedIndex: number[] = [];

const getNext = (): string => {
  if (!questionList) {
    return "сам придумывай себе вопросы, пес!";
  }

  if (!lastQuestionIndex) {
    lastQuestionIndex = 0;
  }

  lastQuestionIndex = (lastQuestionIndex + 1) % questionList.length;
  alreadyUsedIndex.push(lastQuestionIndex);
  return questionList[lastQuestionIndex];
};

const loadQuestions = (data: string) => {
  const questions = arrayShuffle(data.split(/\r?\n/));
  if (questions.length === 0) {
    return;
  }

  alreadyUsedIndex = [];
  questionList.length = 0;

  questions.forEach(x => questionList.push(x));
};

const isQuestionsLoaded = () => {
  return questionList.length > 0;
}

export const QuestionStorage = {
  getNext,
  loadQuestions,
  isQuestionsLoaded
};
