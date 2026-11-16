/** In-memory discussion session. It deliberately has no score or persistence. */
export class QuizSession {
  constructor(questions) {
    if (!questions.length) throw new Error('A quiz needs questions');
    this.questions = questions;
    this.reset();
  }
  reset() {
    this.index = 0;
    this.finished = false;
    this.selections = this.questions.map(() => []);
    this.validated = new Set();
  }
  select(values) {
    if (this.finished || this.validated.has(this.index)) return false;
    const count = this.questions[this.index].options.length;
    if (values.some(value => !Number.isInteger(value) || value < 0 || value >= count)) throw new Error('Invalid option');
    this.selections[this.index] = [...new Set(values)].sort((a,b)=>a-b);
    return true;
  }
  validate() {
    if (this.finished || !this.selections[this.index].length) return false;
    this.validated.add(this.index);
    return true;
  }
  next() {
    if (this.finished || !this.validated.has(this.index)) return false;
    if (this.index === this.questions.length - 1) this.finished = true;
    else this.index++;
    return true;
  }
  previous() {
    if (this.finished) { this.finished = false; return true; }
    if (this.index === 0) return false;
    this.index--;
    return true;
  }
  matches(index = this.index) {
    const expected = [...this.questions[index].answers].sort((a,b)=>a-b);
    return JSON.stringify(this.selections[index]) === JSON.stringify(expected);
  }
}
