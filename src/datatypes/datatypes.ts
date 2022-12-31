enum VOWEL {
    MIXED = "מעורב",
    A = "קמץ, פתח",
    E = "חיריק",
    O = "קובוץ, שורוק",
    I = "חולם",
    U = "סגול, צירה"
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

class Lesson {
    lesson_name: string
    vowel: VOWEL
    lesson_letters: Array<string>
    is_exam: boolean
    shuffle_questions: boolean

    constructor(name: string, vowel: VOWEL = VOWEL.MIXED, letters: Array<string> = [], is_exam: boolean, shuffle: boolean) {
        this.lesson_name = name
        this.vowel = vowel
        this.lesson_letters = letters
        this.is_exam = is_exam
        this.shuffle_questions = shuffle
    }
}

class MultipleSelectionQuestion {
    question: TextWithVoice
    correct_answer: Answer
    incorrect_answers: Array<Answer>
    shuffle: boolean = true
    use_textures: boolean = false
    use_text: boolean = true
}

class QuestionDataReadText {
    text_title: TextWithVoice
    text: TextWithVoice
    definitions: Array<WordData>
    quiz: Array<MultipleSelectionQuestion>

}