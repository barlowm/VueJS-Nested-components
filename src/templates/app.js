import Credentials from "./credentials.js";
import Sel_Server from "./select_server.js";
import config from "./sConfig.js";

export default {
	name: "App",
	components: {
		Credentials,
		Sel_Server
	},
	computed: {
		"selected_server": {
			get() { return this.value; },
			set(selected_server) { this.$emit("input", selected_server );}
		}
	},

	data: function() {
		return {
			"server": "",
			"credential": {
				"UserName": "",
				"Password": "",
			}
		};
	},

	methods: {
		// Handle data received from the "Credentials" component
		"Credentials": function(credentials) {
			this.credential.UserName = credentials.un;
			this.credential.Password = credentials.pwd;
		},

		// Handle data received from the "Sel_Server" component
		"SServer": function(theServerName, theServerObj) {
			console.log(theServerName)
			console.log(theServerObj);
			this.server = theServerName;
			this.serverConfig = JSON.parse(theServerObj);
		}
	},

	template: `
		<div>
			<div class="bordered-container">
				<label>Select Server: <Sel_Server :server="selected_server" @SServer="SServer"></Sel_Server></label>
				Server = {{server}} - {{serverConfig}}
				<h2>Enter Credentials</h2>
				<credentials :credential="credential" @Credentials="Credentials"></credentials>
			</div>
			<div class="bordered-container">
				<h2>Display Credentials Entered</h2>
				UserName: {{credential.UserName}}<br>
				Password: {{credential.Password}}
			</div>
		</div>
	`
};
