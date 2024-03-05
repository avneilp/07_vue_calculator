import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
createApp({
    data() {
        return {
            prev_expressions: { "0": "" },
            expression: "",
            result: "",
            prev_calculation: "",
            eqn: [],
            eqn_string: "",
            expression_id: 1,
            left_paren: 0,
            right_paren: 0,
            last_paren: ")"
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
                if (this.eqn[i] == "(") {
                    this.left_paren++
                    this.last_paren = "("
                }
                if (this.eqn[i] == ")") {
                    this.right_paren++
                    this.last_paren = ")"
                }
                this.eqn_string += this.eqn[i]
            }

            if ((this.left_paren != this.right_paren) || (this.last_paren == "(")) {
                this.result = "= SYNTAX ERROR"
            }
            else {
                this.result = " = " + eval(this.eqn_string)


            }
            this.prev_calculation = this.expression + this.result
            this.expression = ""
            this.result = ""
            this.last_paren = ")"
            this.left_paren = 0
            this.right_paren = 0

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

        update(event) {
            if (
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
            else if (this.expression.slice(-2) == "^2") {
                this.expression = this.expression.slice(0, -2) + " ² "
            }
            else if (this.expression.slice(-4) == "sqrt") {
                this.expression = this.expression.slice(0, -4) + " √ "
            }
            else if (this.expression.slice(-1) == "(") {
                this.expression = this.expression.slice(0, -1) + " ( "
            }
            else if (this.expression.slice(-1) == ")") {
                this.expression = this.expression.slice(0, -1) + " ) "
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