function removeLogs(ns) {
    ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('getServerSecurityLevel');
	ns.disableLog('getServerMinSecurityLevel');
	ns.disableLog('getServerMaxMoney');
}

function setupConfig(ns) {
    var { server, grow } = ns.flags([
		['server', ns.getHostname()],
		['grow', 1]
	]);
    const minSecurityLevel = grow
		? ns.getServerMinSecurityLevel(server)
		: ns.getServerSecurityLevel(server)
    const maxMoney = grow
		? ns.getServerMaxMoney(server)
		: ns.getServerMoneyAvailable(server)

    return { server, minSecurityLevel, maxMoney }
}

/** @param {NS} ns */
export async function main(ns) {
	// Loggin
	removeLogs(ns)

    function log(message) {
        ns.print(`
            ${message}
        `)
    }

    const { server, minSecurityLevel, maxMoney } = setupConfig(ns)

    log(`
        Server name: ${server}
        Server minimum security level: ${minSecurityLevel}
        Server max money: ${maxMoney}
    `)

    // Run endless hack
	while (true) {
		if (ns.getServerSecurityLevel(server) > minSecurityLevel) {
			log('Weaking server...')

            await ns.weaken(server);

			log(`ServerSecurityLevel: ${ns.getServerSecurityLevel(server)}`)
		} else if (ns.getServerMoneyAvailable(server) < maxMoney) {
			log('Adding currency...')

			await ns.grow(server);
            
			log(`Server currency: ${ns.getServerMoneyAvailable(server)}`)
		} else {
            log('Hacking...')

			var gotMoney = await ns.hack(server);
            
			log(`Hacked money: ${gotMoney}`)
		}
	}
}