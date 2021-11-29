# GH Extension: Members (_gh members_)

## Jaime Simeón Palomar Blumenthal - alu0101228587@ull.edu.es

### **Description**

This GitHub extension, given an owner, provides a list of members of thr organization, and given a repository name, the details of said repository.


### **Installation**

With gh api installed, just execute _gh extension install alu0101228587/gh-members_ in your command prompt and it should work just fine.


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


### **Special error messages**

You may get a special error message when the repo or organization you typed don't exist:

```
cannot iterate over:null
```