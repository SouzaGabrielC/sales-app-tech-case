import { createInterface, Interface } from 'readline'

export default class Terminal {
  private readline: Interface

  constructor() {
    this.readline = createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  question(questionString: string): Promise<string> {
    const question = questionString[questionString.length - 1] !== ' ' ? questionString + ' ' : questionString
    return new Promise((resolve) => {
      this.readline.question(question, (result) => resolve(result))
    })
  }

  close() {
    this.readline.close()
  }
}