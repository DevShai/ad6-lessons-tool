import React from "react";
import QuestionFormMaleFemale from "src/components/QuestionsForms/MaleFemale";
import QuestionFormTextWithQuiz from "src/components/QuestionsForms/TextWithQuiz";

export enum VOWEL {
    MIXED = "מעורב",
    A = "קמץ, פתח",
    E = "חיריק",
    O = "קובוץ, שורוק",
    I = "חולם",
    U = "סגול, צירה"
}

export enum QUESTION_TYPES {
    READ_VOWEL,
    TEXT_WITH_QUIZ,
    MALE_FEMALE,
    LINE_DRAW,
    SYLLABLES,
}

export const QUESTION_TYPES_INFO = {
    "הצגת הצליל": QUESTION_TYPES.READ_VOWEL,
    "טקסט עם שאלות": QUESTION_TYPES.TEXT_WITH_QUIZ,
    "מיון מילים לפי זכר או נקבה": QUESTION_TYPES.MALE_FEMALE,
    "מתיחת קו בין תמונה למילה": QUESTION_TYPES.LINE_DRAW,
    "פירוק להבהרות": QUESTION_TYPES.SYLLABLES,
}

export function CreateQuestion(type: QUESTION_TYPES): Question | null {
    var question: Question = null
    switch (type) {
        case QUESTION_TYPES.READ_VOWEL:
            question = new QuestionDataReadVowel()
            break;
        case QUESTION_TYPES.TEXT_WITH_QUIZ:
            question = new QuestionDataReadText()
            break;
        case QUESTION_TYPES.MALE_FEMALE:
            question = new QuestionDataMaleFemale()
            break;
        case QUESTION_TYPES.LINE_DRAW:
            question = new QuestionDataDrawLine()
            break;
        case QUESTION_TYPES.SYLLABLES:
            question = new QuestionDataSyllable()
            break;
    }
    return question
}

export function GetForm(question: Question, idx: number, updateFunc= null) {
    switch (question.type) {
        case QUESTION_TYPES.READ_VOWEL:
            return <div/>
        case QUESTION_TYPES.TEXT_WITH_QUIZ:
           return <QuestionFormTextWithQuiz questionData={question} updateFunc={updateFunc} idx={idx}/>
        case QUESTION_TYPES.MALE_FEMALE:
            return <QuestionFormMaleFemale questionData={question} updateFunc={updateFunc} idx={idx}/>
        case QUESTION_TYPES.LINE_DRAW:
            return <div/>
        case QUESTION_TYPES.SYLLABLES:
            return <div/>
    }
}

interface TextWithVoice {
    text: string
    audio: Array<any>
}

interface Answer {
    text: string
    texture: any
}

interface WordData {
    word: TextWithVoice
    definition: TextWithVoice
    texture: any
}

export interface WordGenderData {
    male: string,
    female: string
}

export class Lesson {
    lesson_name: string
    vowel: VOWEL
    lesson_letters: Array<string>
    is_exam: boolean
    shuffle_questions: boolean
    questions: Array<Question> = []

    /* constructor(name: string = "", vowel: VOWEL = VOWEL.MIXED, letters: Array<string> = [], is_exam: boolean, shuffle: boolean) {
        this.lesson_name = name
        this.vowel = vowel
        this.lesson_letters = letters
        this.is_exam = is_exam
        this.shuffle_questions = shuffle
    } */
}

export class Question {
    type: QUESTION_TYPES
}

export class MultipleSelectionQuestion {
    question: TextWithVoice = {text: '', audio: undefined}
    correct_answer: Answer = {text: '', texture: undefined}
    incorrect_answers: Array<Answer> = [{text: '', texture: undefined}, {text: '', texture: undefined}, {text: '', texture: undefined}]
    shuffle: boolean = true
    use_textures: boolean = false
    use_text: boolean = true
}

export class QuestionDataReadText extends Question {
    text_title: TextWithVoice = {text: "", audio: undefined}
    text: TextWithVoice = {text: "", audio: undefined}
    definitions: Array<WordData> = []
    quiz: Array<MultipleSelectionQuestion> = []

    constructor() {
        super()
        this.type = QUESTION_TYPES.TEXT_WITH_QUIZ
    }
}

export class QuestionDataReadVowel extends Question {
    letter: string
    vowel: VOWEL
    alt_form: boolean = false

    constructor() {
        super()
        this.type = QUESTION_TYPES.READ_VOWEL
    }
}

export class QuestionDataDrawLine extends Question {
    words: Array<WordData>

    constructor() {
        super()
        this.type = QUESTION_TYPES.LINE_DRAW
    }
}

export class QuestionDataMaleFemale extends Question {
    word_pairs: Array<WordGenderData> = []

    constructor() {
        super()
        this.type = QUESTION_TYPES.MALE_FEMALE
    }
}

export class QuestionDataSyllable extends Question {
    syllables: Array<string>
    answer_audio: any

    constructor() {
        super()
        this.type = QUESTION_TYPES.SYLLABLES
    }
}

