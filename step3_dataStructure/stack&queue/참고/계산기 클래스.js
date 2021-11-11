class Calculator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add() {
    const result = this.x + this.y;
    this.print(`ADD RESULT: ${result}`);
  }
  minus() {
    const result = this.x - this.y;
    this.print(`MINUS RESULT: ${result}`);
  }
  mul() {
    const result = this.x * this.y;
    this.print(`MULTIPLY RESULT: ${result}`);
  }
  div() {
    const result = this.x / this.y;
    this.print(`DIVIDE RESULT: ${result}`);
  }
  print(input) {
    console.log(input);
  }
}

const calc = new Calculator(5, 4);
calc.add();
calc.minus();
calc.mul();
calc.div();
