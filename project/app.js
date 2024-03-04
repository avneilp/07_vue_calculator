import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
createApp({
    data() {
        return {
            prev_expressions: {"0":""},
            expression: "",
            result: "",
            prev_calculations: [],
            eqn: [],
            eqn_string: "",
            expression_id: 1
        };
    },
    methods: {
        calc_result() {
            this.eqn = this.expression.split(" ")
            this.eqn_string = ""
            for (var i = 0; i < this.eqn.length; i++) {
                if (this.eqn[i] == "×") {
                    this.eqn[i] = "*"
                }
                if (this.eqn[i] == "÷") {
                    this.eqn[i] = "/"
                }
                if (this.eqn[i] == "√") {
                    if (this.eqn[i + 1] == "" && this.eqn[i + 2] == "(") {
                        this.eqn[i] = "Math.sqrt"
                    }
                    else {
                        this.eqn[i] = "Math.sqrt("
                        this.eqn[i + 1] += ")"
                    }
                }
                if (this.eqn[i] == "²") {
                    this.eqn[i] = "** 2"
                }
                if (this.eqn[i] == "%") {
                    this.eqn[i] = "/100"
                }
                if (this.eqn[i] == "mod") {
                    this.eqn[i] = "%"
                }
                if (this.eqn[i] == "π") {
                    this.eqn[i] = "Math.PI"
                }
                if (this.eqn[i].includes("π")) {
                    this.eqn[i] = this.eqn[i].substring(0, this.eqn[i].length - 1) + "*Math.PI"
                }
                this.eqn_string += this.eqn[i]
            }
            this.result = " = " + eval(this.eqn_string)
        },
        backspace() {
            this.prev_expressions[this.expression_id] = this.expression
            this.expression_id++

            this.expression = this.expression.slice(0, -1)

        },
        add_char(x) {
            //store previous expression into a dictionary with key expression_id
            this.expression += x

            this.prev_expressions[this.expression_id] = this.expression
            this.expression_id++

        },
        update() {
            if (this.expression.slice(-1) == "+") {
                this.expression = this.expression.slice(0, -1) + " + "

            }
            else if (this.expression.slice(-1) == "-") {
                this.expression = this.expression.slice(0, -1) + " - "
            }
            else if (this.expression.slice(-1) == "*") {
                this.expression = this.expression.slice(0, -1) + " × "
            }
            else if (this.expression.slice(-1) == "*") {
                this.expression = this.expression.slice(0, -1) + " ÷ "
            }
            else if(this.expression.slice(-2) == "^2" ) {
                this.expression = this.expression.slice(0,-2) + " ² "
            }
            this.prev_expressions[this.expression_id] = this.expression
            this.expression_id++

        },
     
         

        undo() {
            //turn current expression into last recorded expression 


            delete this.prev_expressions[this.expression_id]
            this.expression = (this.prev_expressions[this.expression_id - 1])
            this.expression_id -= 1
            

        }

    }

}).mount('#app')