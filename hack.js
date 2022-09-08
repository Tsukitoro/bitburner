/** @param {NS} ns */
export async function main(ns) {
	// Loggin
	ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('getServerSecurityLevel');
	ns.disableLog('getServerMinSecurityLevel');
	ns.disableLog('getServerMaxMoney');

    function log(message) {
        ns.print(`
            ${message}
        `)
    }

    // Config
    const server = ns.getHostname()
    const minSecurityLevel = ns.getServerMinSecurityLevel(server)
    const maxMoney = ns.getServerMaxMoney(server)

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