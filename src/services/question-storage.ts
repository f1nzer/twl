let questionList: string[] = [
    "Вопрос номер #1",
    "Вопрос номер #2",
    "Вопрос номер #3",
    "Вопрос номер #4",
    "Вопрос номер #5",
    "сам придумывай себе впросы, пес!"
];

let lastQuestionIndex: number;
let alreadyUsedIndex: string[number];

export const QuestionStorage = {
    loadQuestions: (data: any) => {
        return false;
    },
    getNext: () => {
        if(!questionList) {
            return "сам придумывай себе впросы, пес!";
        }

        if(!lastQuestionIndex) {
            lastQuestionIndex = 0;
        }

        lastQuestionIndex = (lastQuestionIndex + 1) % lastQuestionIndex;
        return questionList[lastQuestionIndex];
    },
};