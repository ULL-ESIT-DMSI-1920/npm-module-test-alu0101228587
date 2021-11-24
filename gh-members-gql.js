#! /usr/bin/env node

const getMemberList = (owner) => `
query getMembers {
  organization(login: ${owner}) {
    membersWithRole(first: 10) {
      nodes {
        name
      }
    }
  }
}
`

const getRepoList = (owner) => `
query getMembers {
  organization(login: ${owner}) {
    repositories(first: 10) {
      nodes {
        name
      }
    }
  }
}
`

const ins = require("util").inspect;
const deb = (...args) => {
	if (debug) console.log(ins(...args, { depth: null }));
};

const fs = require("fs");
const shell = require('shelljs');
const { Command } = require('commander');
const program = new Command();

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

if (!owner && args.length == 1) {
	owner = args[0].split("/")[0];
	var repoName = args[0].split("/")[1];

	console.log(`\n-- Information of ${repoName} --`)

	console.log('\n\t-> Links to files:');
	//shell.exec(`gh api -X GET /repos/${owner}/${repoName}/contents --jq '.[] | .name, .html_url'`);

	console.log('\n\t-> Branches:');
	shell.exec(`gh api -X GET /repos/${owner}/${repoName}/branches --jq '.[] | .name'`);

	console.log('\n\t-> Contributors:');
	shell.exec(`gh api -X GET /repos/${owner}/${repoName}/contributors --jq '.[].login'`)

	shell.exit(0);
}else if (!owner) {
	console.log("Owner not specified. Sending help...");

	program.help();
	shell.exit(1);
}

console.log(`\n-- Members of ${owner} --\n`);
shell.exec(`gh api -X GET /orgs/${owner}/members --jq ".[].login"`);

if (repo) {
	console.log(`\n-- Repositories of ${owner} --\n`);
	shell.exec(`gh api -X GET /orgs/${owner}/repos --jq '.[].name'`);
}
