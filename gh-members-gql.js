#! /usr/bin/env node

const getMemberList = (owner) => `
query {
  organization(login: "${owner}") {
    membersWithRole(first: 20) {
      nodes {
        name
      }
    }
  }
}
`;

const getRepoList = (owner) => `
query {
  organization(login: "${owner}") {
    repositories(first: 50) {
      nodes {
        name
      }
    }
  }
}
`;

const getRepoContent = (owner, repo) => `
query {
  repository(owner: "${owner}", name: "${repo}") {
    object(expression: "master:") {
      ... on Tree {
        entries {
          name
        }
      }
    }
  }
}
`;

const getRepoBranches = (owner, repo) => `
query {
  repository(owner: "${owner}", name: "${repo}") {
    refs(first: 10, refPrefix: "refs/heads/") {
      nodes {
        name
      }
    }
  }
}
`;

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

// console.log(getMemberList("ULL-ESIT-DMSI-1920"));
// console.log(getRepoList("ULL-ESIT-DMSI-1920"));

if (!owner && args.length == 1) {
	owner = args[0].split("/")[0];
	var repoName = args[0].split("/")[1];

	console.log(`\n-- Information of ${repoName} --`)

	console.log('\n\t-> Files:');
	shell.exec(`gh api graphql --paginate -f query='${getRepoContent(owner, repoName)}' --jq '.data.repository.object.entries.[].name'`);

	console.log('\n\t-> Branches:');
	shell.exec(`gh api graphql --paginate -f query='${getRepoBranches(owner, repoName)}' --jq '.data.repository.refs.nodes.[].name'`);

	shell.exit(0);
} else if (!owner) {
	console.log("Owner not specified. Sending help...");

	program.help();
	shell.exit(1);
}

console.log(`\n-- Members of ${owner} --\n`);
shell.exec(`gh api graphql --paginate -f query='${getMemberList(owner)}' --jq ".data.organization.membersWithRole.nodes.[].name"`);

if (repo) {
	console.log(`\n-- Repositories of ${owner} --\n`);
  shell.exec(`gh api graphql --paginate -f query='${getRepoList(owner)}' --jq ".data.organization.repositories.nodes.[].name"`);
}