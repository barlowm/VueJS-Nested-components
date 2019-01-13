import config from './sConfig.js';

export default {
    name: "Select_Server",
    props: {
        SelectedServer: ""
    },
    data() {
    	let servers = config.servers;
        return { servers }
    },

	methods: {
		SServer: function($event) {
			// console.log($event.target);
			let idx = $event.target.selectedIndex;
			let name = $event.target.options[idx].label;
			let value = JSON.stringify($event.target.value)
			this.$emit("SServer", name, value);
		},
	},

    template: `
		<select
			:value="SelectedServer"
			v-on:input="SServer"
		>
        <option v-for="(sProps, server) in servers"
                :value=JSON.stringify(sProps)
                v-html="server"
        ></option>
    </select>
    `
};

