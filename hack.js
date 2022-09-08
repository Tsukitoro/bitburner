/** @param {NS} ns */
export async function main(ns) {
	// Loggin
	ns.disableLog('getServerMoneyAvailable');
	ns.disableLog('getServerSecurityLevel');

	// Params Init
	var { server } = ns.flags([
		['server', ns.getHostname()]
	]);
	const { minCurrency, maxlevel } = ns.flags([
		['server', server],
		['minCurrency', ns.getServerMoneyAvailable(server)],
		['maxlevel', ns.getServerSecurityLevel(server)],
	]);

    var initTextResult = `
        Target Server: ${server}
        Min currency: ${minCurrency}
        Max security level: ${maxlevel}
    `
    ns.print(initTextResult)

    // Run endless hack
    ns.run('baseHack.js');
}