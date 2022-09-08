/** @param {NS} ns */
export async function main(ns, server, minCurrency, maxlevel) {
	ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('getServerSecurityLevel');

	var minCurrency = minCurrency || ns.getServerMoneyAvailable(server);
	var maxlevel = maxlevel || ns.getServerSecurityLevel(server);
	
	while (true) {
		var currency = ns.getServerMoneyAvailable(server);
		if (currency < minCurrency) {
			ns.print('Adding currency...')
			for (var i = 0; i < 10; i++) {
				await ns.grow(server);
			}
			
			ns.print(`Server currency: ${currency}`)
		}
		var level = ns.getServerSecurityLevel(server);

		if (level > maxlevel) {
			ns.print('Weaking server...')

			while (level > maxlevel) {
				await ns.weaken(server);
				level = ns.getServerSecurityLevel(server);
			}
			ns.print(`ServerSecurityLevel: ${level}`)
		} 	

		var gotMoney = await ns.hack(server);
		ns.print(`Hacked money: ${gotMoney}`)
	}
}