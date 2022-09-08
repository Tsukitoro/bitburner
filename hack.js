/** @param {NS} ns */
export async function main(ns) {
	// Loggin
	ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('getServerSecurityLevel');
	ns.disableLog('getServerMinSecurityLevel');
	ns.disableLog('getServerMaxMoney');

    // Config
    const server = ns.getHostname()
    const minSecurityLevel = ns.getServerMinSecurityLevel(server)
    const maxMoney = ns.getServerMaxMoney(server)

    ns.print(`
        Server name: ${server}
        Server minimum security level: ${minSecurityLevel}
        Server max money: ${maxMoney}
    `)

    // Run endless hack
	while (true) {
		if (ns.getServerSecurityLevel(server) > minSecurityLevel) {
			ns.print('Weaking server...')
            await ns.weaken(server);
			ns.print(`ServerSecurityLevel: ${ns.getServerSecurityLevel(server)}`)
		} else if (ns.getServerMoneyAvailable(server) < maxMoney) {
			ns.print('Adding currency...')
			await ns.grow(server);
			ns.print(`Server currency: ${ns.getServerMoneyAvailable(server)}`)
		} else {
			var gotMoney = await ns.hack(server);
			ns.print(`Hacked money: ${gotMoney}`)
		}
	}
}