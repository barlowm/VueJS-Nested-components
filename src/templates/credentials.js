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
		};
	},

	methods: {
		Credentials: function(id, value) {
			if ("UserName" == id) {
				this.credential.un = value;
			}
			if ("Password" == id) {
				this.credential.pwd = value;
			}
			this.$emit('Credentials', this.credential);
		}
	},

	template: `
		<table>
			<CredentialInput field="UserName" label="Server Username" help="" @CInput="Credentials"></CredentialInput>
			<CredentialInput field="Password" label="Server Password" help="" @CInput="Credentials"></CredentialInput>
		</table>
	`
};
