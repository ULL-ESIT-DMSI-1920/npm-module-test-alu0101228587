#! /usr/bin/env node

const shell = require('shelljs');

//  List of members by owner
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

//  List if repositories by owner
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

//  List of files by repository
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

//  List of branches by repository
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

// Uses all repository related queries above
// and returns a lot of repo info.
function getRepoInfo(repoDir) {
    var owner = repoDir.split("/")[0];
	var repoName = repoDir.split("/")[1];

	console.log(`\n-- Information of ${repoName} --`)

	console.log('\n\t-> Files:');
	shell.exec(`gh api graphql --paginate -f query='${getRepoContent(owner, repoName)}' --jq '.data.repository.object.entries.[].name'`);

	console.log('\n\t-> Branches:');
	shell.exec(`gh api graphql --paginate -f query='${getRepoBranches(owner, repoName)}' --jq '.data.repository.refs.nodes.[].name'`);

	shell.exit(0);
}

function getOrgMembers(orgName, repo) {
    console.log(`\n-- Members of ${orgName} --\n`);
    shell.exec(`gh api graphql --paginate -f query='${getMemberList(orgName)}' --jq ".data.organization.membersWithRole.nodes.[].name"`);

    if (repo) {
        console.log(`\n-- Repositories of ${orgName} --\n`);
        shell.exec(`gh api graphql --paginate -f query='${getRepoList(orgName)}' --jq ".data.organization.repositories.nodes.[].name"`);
    }
}

module.exports = {
    getRepoInfo,
    getOrgMembers
}