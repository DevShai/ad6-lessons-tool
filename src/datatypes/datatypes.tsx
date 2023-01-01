import React from "react";
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

interface TextWithVoice {
    text: string
    audio: Array<any>
}

interface Answer {
    text: TextWithVoice
    texture: any
}

interface WordData {
    word: TextWithVoice
    definition: TextWithVoice
    texture: any
}

interface WordGenderData {
    male: WordData,
    female: WordData
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
    form: any
}

export class MultipleSelectionQuestion {
    question: TextWithVoice
    correct_answer: Answer
    incorrect_answers: Array<Answer>
    shuffle: boolean = true
    use_textures: boolean = false
    use_text: boolean = true
}

export class QuestionDataReadText extends Question {
    text_title: TextWithVoice
    text: TextWithVoice
    definitions: Array<WordData>
    quiz: Array<MultipleSelectionQuestion>

    constructor() {
        super()
        this.type = QUESTION_TYPES.TEXT_WITH_QUIZ
        this.form = <QuestionFormTextWithQuiz questionData={this}/>
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
    word_pairs: Array<WordGenderData>

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
