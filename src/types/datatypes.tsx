import React from "react";
import QuestionFormDrawLine from "src/components/QuestionsForms/DrawLine";
import QuestionFormMaleFemale from "src/components/QuestionsForms/MaleFemale";
import QuestionFormSyllable from "src/components/QuestionsForms/Syllable";
import QuestionFormTextWithQuiz from "src/components/QuestionsForms/TextWithQuiz";
import QuestionFormVowelIntro from "src/components/QuestionsForms/VowelIntro";

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
    "פירוק להברות": QUESTION_TYPES.SYLLABLES,
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

export function GetForm(question: Question, idx: number, updateFunc = null) {
    switch (question.type) {
        case QUESTION_TYPES.READ_VOWEL:
            return <QuestionFormVowelIntro questionData={question} updateFunc={updateFunc} idx={idx} />
        case QUESTION_TYPES.TEXT_WITH_QUIZ:
            return <QuestionFormTextWithQuiz questionData={question} updateFunc={updateFunc} idx={idx} />
        case QUESTION_TYPES.MALE_FEMALE:
            return <QuestionFormMaleFemale questionData={question} updateFunc={updateFunc} idx={idx} />
        case QUESTION_TYPES.LINE_DRAW:
            return <QuestionFormDrawLine questionData={question} updateFunc={updateFunc} idx={idx} />
        case QUESTION_TYPES.SYLLABLES:
            return <QuestionFormSyllable questionData={question} updateFunc={updateFunc} idx={idx} />
    }
}

export interface FileData {
    fileObject: File
    base64: string
}

export interface TextWithVoice {
    text: string 
    audio: FileData
}

interface Answer {
    text: string
    texture: any
}


export interface WordData {
    word: TextWithVoice
    definition: TextWithVoice
    texture?: FileData
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

export function getDisplayName(type: QUESTION_TYPES): string {
    var displayName = ""
    Object.keys(QUESTION_TYPES_INFO).forEach(element => {
        if (QUESTION_TYPES_INFO[element] === type) {
            displayName = element
        }
    });
    return displayName
}

export class Question {
    type: QUESTION_TYPES = undefined
}

export class MultipleSelectionQuestion {
    question: TextWithVoice = { text: '', audio: undefined }
    correct_answer: Answer = { text: '', texture: undefined }
    incorrect_answers: Array<Answer> = [{ text: '', texture: undefined }, { text: '', texture: undefined }, { text: '', texture: undefined }]
    shuffle: boolean = true
    use_textures: boolean = false
    use_text: boolean = true
}

export class QuestionDataReadText extends Question {
    text_title: TextWithVoice = { text: "", audio: undefined }
    text: TextWithVoice = { text: "", audio: undefined }
    definitions: Array<WordData> = []
    quiz: Array<MultipleSelectionQuestion> = []

    constructor() {
        super()
        this.type = QUESTION_TYPES.TEXT_WITH_QUIZ
    }
}

export class QuestionDataReadVowel extends Question {
    letter: string = ""
    vowel: VOWEL = VOWEL.A
    alt_form: boolean = false

    constructor() {
        super()
        this.type = QUESTION_TYPES.READ_VOWEL
    }
}

export class QuestionDataDrawLine extends Question {
    words: Array<WordData> = []

    constructor() {
        super()
        this.type = QUESTION_TYPES.LINE_DRAW
    }
}

export class QuestionDataMaleFemale extends Question {
    female_words: Array<string> = []
    male_words: Array<string> = []

    constructor() {
        super()
        this.type = QUESTION_TYPES.MALE_FEMALE
    }
}

export class QuestionDataSyllable extends Question {
    syllables: Array<TextWithVoice> = []
    answer_audio: FileData = { base64: '', fileObject: undefined }

    constructor() {
        super()
        this.type = QUESTION_TYPES.SYLLABLES
    }
}

export const getBase64 = function (file: File, trim: boolean = true): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (file == undefined) {
            resolve('')
        } else {
            reader.readAsDataURL(file);
            reader.onload = () => {
                var result = reader.result as string
                if (trim && result.indexOf(",") >= 0) {
                    result = result.split(',')[1]
                }
                resolve(result);
            }
            reader.onerror = error => reject(error);
        }
    });
}

const getFile = function (base64Data: string, filename: string = '', contentType = "", sliceSize = 512) {
    var byteCharacters = window.atob(base64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new File(byteArrays, filename, { type: contentType });
}

export const getMediaPreview = function (base64: string, filename: string = '', contentType = "", sliceSize = 512) {
    try {
        var fileObject = getFile(base64, filename, contentType, sliceSize)
        var preview = URL.createObjectURL(fileObject)
        return preview
    } catch (e) {
        return ''
    }
}