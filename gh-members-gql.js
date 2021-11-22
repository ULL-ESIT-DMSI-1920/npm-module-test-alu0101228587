const getRepoId = (owner, name) => `
query repoId {
    repository(
      owner: ${owner},
      name: ${name}
    ){
      id
    }
}
`


const setRepoName = (newName, id) => `
mutation repoRename {
    updateRepository(input:{
      name: ${newName}
      repositoryId: ${id}
    }){
      repository{
        name
      }
    }
}
`
