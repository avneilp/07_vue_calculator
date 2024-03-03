import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
createApp({
    data() {
        return {
            prev_values: [],
            value: "",
            result: "",
            prev_calculations: [],
            eqn: [],
            eqn_string: "",
        };
    },
    methods: {
        calc_result() {
            this.eqn = this.value.split(" ")
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
            this.value = this.value.slice(0, -1)
        },
        add_char(x) {
            this.value += x
        },
        update(){
            if(this.value.slice(-1) == "+") {
                this.value = this.value.slice(0,-1) + " + "
            }
            if(this.value.slice(-1) == "-") {
                this.value = this.value.slice(0,-1) + " - "
            }
            if(this.value.slice(-1) == "*") {
                this.value = this.value.slice(0,-1) + " × "
            }
            if(this.value.slice(-1) == "*"){
                this.value = this.value.slice(0,-1) + "÷"
            }
        }
    }

}).mount('#app')