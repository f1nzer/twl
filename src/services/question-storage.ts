const questionList: string[] = [
  "Вопрос номер #1",
  "Вопрос номер #2",
  "Вопрос номер #3",
  "Вопрос номер #4",
  "Вопрос номер #5",
  "сам придумывай себе вопросы, пес!",
];

let lastQuestionIndex: number;
// let alreadyUsedIndex: string[number];

export const QuestionStorage = {
//   loadQuestions: (data: any) => {
//     return false;
//   },
  getNext: () => {
    if (!questionList) {
      return "сам придумывай себе вопросы, пес!";
    }

    if (!lastQuestionIndex) {
      lastQuestionIndex = 0;
    }

    lastQuestionIndex = (lastQuestionIndex + 1) % questionList.length;
    return questionList[lastQuestionIndex];
  },
};
