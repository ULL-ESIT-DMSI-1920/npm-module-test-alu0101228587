# GH Extension: Members (_gh members_)

## Jaime Simeón Palomar Blumenthal - alu0101228587@ull.edu.es

### **Description**

This GitHub extension, given an owner, provides a list of members of thr organization, and given a repository name, the details of said repository.


### **Installation**

**With gh api installed**, just execute _gh extension install alu0101228587/gh-members_ in your command prompt and it should work just fine.

**To install it as an NPM module**, you can run _npm install -g @alu0101228587/gh-members_. If you don't want to install it globally, omit the _-g_ option.


### **Usage**

You can use the following options:

```
-V, --version        output the version number
-r, --repo           List repositories of owner
-o, --owner <owner>  Specify owner
-h, --help           display help for command
```

* **V** and **h** are self explanatory.
* **o** allows you to specify an organization.
* If you use **r** and **o** you will be provided with a list of repositories of the specified organization.

If you use this extension in the following way:

```
gh members <owner>/<repository>
```

You will be provided with a list of files and branches in the repository.

### **Exported functions**

You also can use this module as a library, as it is exporting two functions:

* **getRepoInfo(repoDir)**: Prints a list of files and branches of a given repository direction (_owner/repo_).

* **getOrgMembers(orgName, repo)**: Prints a list of members of a given organization, and if the _repo_ flag is on it also prints a list of repositories of said organization.

```js
const {getRepoInfo, getOrgMembers} = require('@alu0101228587/gh-members');
```

### **Special error messages**

You may get a special error message when the repo or organization you typed don't exist:

```
cannot iterate over:null
```