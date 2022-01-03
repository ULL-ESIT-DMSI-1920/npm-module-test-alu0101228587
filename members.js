#! /usr/bin/env node

const shell = require('shelljs');

/** 
 * List of members by owner
 * @param {string} owner - GitHub Organization
*/
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

/** 
 * List of repositories by owner
 * @param {string} owner - GitHub Organization
*/
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

/** 
 * List of files by repository
 * @param {string} owner - GitHub Organization
 * @param {string} repo - Repository name
*/
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


/** 
 * List of branches by repository
 * @param {string} owner - GitHub Organization
 * @param {string} repo - Repository name
*/
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

/** 
 * Uses all repository related queries above and returns a lot of repo info
 * @param {string} repoDir - Owner/Name
*/
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

/** 
 * Returns list of members. If repo != null also a list of repositories
 * @param {string} orgName - Owner
 * @param {string} repo - If != null returns repositories
*/
function getOrgMembers(orgName, repo) {
    var execResult = '';
  
    console.log(`\n-- Members of ${orgName} --\n`);
    execResult += shell.exec(`gh api graphql --paginate -f query='${getMemberList(orgName)}' --jq ".data.organization.membersWithRole.nodes.[].name"`).stdout;

    if (repo) {
        console.log(`\n-- Repositories of ${orgName} --\n`);
        execResult += shell.exec(`gh api graphql --paginate -f query='${getRepoList(orgName)}' --jq ".data.organization.repositories.nodes.[].name"`).stdout;
    }

    return execResult;
}

module.exports = {
    getRepoInfo,
    getOrgMembers
}