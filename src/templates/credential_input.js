export default {
	name: "CredentialInput",
	props: [ "field", "label", "help", "value" ],
	template: `
			<tr>
				<th><label :for="field">{{label}}:</label></th>
				<td><input
				type="password"
				:id="field"
				:value="value"
				v-on:input="$emit('CInput', $event.target.id, $event.target.value)"
				><span style="color:white;">{{help}}</span></td>
			</tr>
	`,
};
