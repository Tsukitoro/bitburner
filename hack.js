/** @param {NS} ns */
export async function main(ns) {
	// Loggin
	ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('getServerSecurityLevel');

    // Run endless hack
    const server = ns.getHostname()
	
	while (true) {
		if (ns.getServerSecurityLevel(server) > ns.getServerMinSecurityLevel(server)) {
			ns.print('Weaking server...')
            await ns.weaken(server);
			ns.print(`ServerSecurityLevel: ${ns.getServerSecurityLevel(server)}`)
		} else if (ns.getServerMoneyAvailable(server) < ns.getServerMaxMoney(server)) {
			ns.print('Adding currency...')
			await ns.grow(server);
			ns.print(`Server currency: ${ns.getServerMoneyAvailable(server)}`)
		} else {
			var gotMoney = await ns.hack(server);
			ns.print(`Hacked money: ${gotMoney}`)
		}
	}
}