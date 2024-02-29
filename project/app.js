import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
createApp({
    data() {
        return {
            prev_values: [],
            value: "",
            result: "",
            prev_calculations: [],
        };
    },
    methods: {
        calc_result(){
            this.result.split(" ")

        },
        undo(){
        },
        add_char(x){
            this.value += x
        }
    }
        
}).mount('#app')