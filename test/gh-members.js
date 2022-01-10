var should = require('chai').should(),
    members = require('@alu0101228587/gh-members/members.js'),
    repoInfo = members.getRepoInfo,
    orgMembers = members.getOrgMembers;

const memberList = "Casiano Rodriguez-Leon\nCasiano\n\nJaime Simeón Palomar Blumenthal\nAntonella García\nSergio P\nLaura Manzini\n\n";

const repoList = "ull-esit-dmsi-1920.github.io\nreact-apollo\ngraphql-js\npb-gh-campus-expert-alu0100592306\np4-t3-dom-alu0100592306\null-esit-dmsi-1920.github.io-source\npb-gh-campus-expert-fuegonellaa\np1-t1-iaas-crguezl\np1-t1-iaas-Wololegend\np1-t1-iaas-alu0101227610\np1-t1-iaas-lauramanzini\nmarkdown-crguezl\nhaikus-for-codespaces\
\nmarkdown-fuegonellaa\nmarkdown-Wololegend\nmarkdown-alu0101232812\nmarkdown-lauramanzini\np2-t1-vscode-TeresaUll\nmarkdown-TeresaUll\np2-t1-vscode-alu0101228587\np2-t1-vscode-alu0101227610\ngh-cli-TeresaUll\ngh-cli-alu0101228587\ngh-cli-lauramanzini\
\np2-t1-vscode-lauramanzini\np1-t1-iaas-TeresaUll\nnpm-module-super-crguezl\nnpm-module-test-lauramanzini\nnpm-module-super-lauramanzini\ngh-repo-rename-lauramanzini\ngh-members\ngh-repo-viewT\ngh-rename-teresa-malo2\
\ngh-repo-rename-teresa-malo\ngh-repo-rename-alu0101227610\npruebita\nundefined\npruebasergio\nchuchu1234\nprueba\nprueba-funciona\ngh-cli-graphql-teresa-bonet-costa\ngh-cli-graphql-sergio-pitti-alu0101232812\ngh-cli-graphql-jaimeSimeon-palomar-blumenthal\
\ngh-members-gql\nprueba-antonella-funciona1\nprueba-laura-funciona\ngh-teresa-repo-rename\npruebaTeresa\nnpm-module-src-alu0101228587\n";

const reposAndMembers = memberList + repoList;

describe('Gets a:', function() {
    it('\t - List of organization members', function() {
        orgMembers("ULL-ESIT-DMSI-1920", null).should.equal(memberList);
    });

    it('\t - List of organization members and repositories', function() {
        orgMembers("ULL-ESIT-DMSI-1920", "-r").should.equal(reposAndMembers);
    });
});