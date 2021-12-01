#! /usr/bin/env node

const ins = require("util").inspect;
const deb = (...args) => {
	if (debug) console.log(ins(...args, { depth: null }));
};

const fs = require("fs");
const shell = require('shelljs');
const { Command } = require('commander');
const program = new Command();
const {getRepoInfo, getOrgMembers} = require('./members');

const config = require('./package.json');

if (!shell.which('git')) {
	shell.echo("Git not installed.");
	shell.exit(1);
}

if (!shell.which('gh')) {
	shell.echo("gh not installed.");
	shell.exit(1);
}

program
	.version(config.version)
	.option('-r, --repo', 'List repositories of owner')
	.option('-o, --owner <owner>', 'Specify owner')

program.parse(process.argv);

const { args } = program;
var { repo, owner } = program.opts();

if (!owner && args.length == 1) getRepoInfo(args[0]);

else if (!owner) {
	console.log("Owner not specified. Sending help...");

	program.help();
	shell.exit(1);
}

getOrgMembers(owner, repo);