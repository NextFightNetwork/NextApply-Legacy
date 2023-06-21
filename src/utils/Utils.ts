import config from "../config.json";

function createID(length, onlyUpperCase) {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	if(onlyUpperCase) {
		characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	}
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

async function addRole(client, roleID, userID) {
	const guild = client.guilds.cache.get(config.guild_id);
	const role = guild.roles.cache.get(roleID);
	const member = guild.members.cache.get(userID);
	await member.roles.add(role);
}

async function removeRole(client, roleID, userID) {
	const guild = client.guilds.cache.get(config.guild_id);
	const role = guild.roles.cache.get(roleID);
	const member = guild.members.cache.get(userID);
	await member.roles.remove(role);
}

function userHasActiveTickets(interaction) {
	return !!interaction.member.roles.cache.has(config.ticket_role_id);
}



export { createID, addRole, removeRole, userHasActiveTickets };
