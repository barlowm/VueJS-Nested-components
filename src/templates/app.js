// import UserList from './UserList.js';
import Credentials from './credentials.js';

export default {
	"name": "App",
	"components": {
		Credentials
	},
	"data": function() {
		return {
			"credential": {
				"UserName": "",
				"Password": "",
			}
		}
	},


	"methods": {
		"CInput": function(something) {
			// console.log("We're Passed - ", something.un,  something.pwd)
			this.credential.UserName = something.un;
			this.credential.Password = something.pwd;
			// this.$emit("credential", this.credential);
		},

	},

	"template": `
		<div>
			<div class="bordered-container">
				<h2>Enter Credentials</h2>
				<credentials :credential="credential" @CInput="CInput"></credentials>
			</div>
			<div class="bordered-container">
				<h2>Display Credentials Entered</h2>
				UserName: {{credential.UserName}}<br>
				Password: {{credential.Password}}
			</div>
		</div>
	`,
};
