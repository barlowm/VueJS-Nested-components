import CredentialInput from './credential_input.js';

export default {
	name: "Credentials",
	components: {
		CredentialInput
	},
	props: [ "UserName", "Password"],
	data: function() {
		return {
			credential: {
				un: "",
				pwd: ""
			}
		}
	},

	methods: {
		CInput: function(id, value) {
			if ("UserName" == id) {
				this.credential.un = value;
			}
			if ("Password" == id) {
				this.credential.pwd = value;
			}
			this.$emit('CInput', this.credential);
		},
	},


	template: `
		<table>
			<CredentialInput field="UserName" label="Server Username" help="" @CInput="CInput"></CredentialInput>
			<CredentialInput field="Password" label="Server Password" help="" @CInput="CInput"></CredentialInput>
		</table>
	`,
};
