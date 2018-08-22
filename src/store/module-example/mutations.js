/*
export const configName = (state, payload) => {
  state.asList.filter(as => as.number === payload.asNumber)[0].name = payload.newName;
}
*/

// NOTE: Readability!!!
export const configName = (state, payload) => {
  let asList = state.asList
  let asNumber = payload.asNumber
  let newName = payload.newName

  // Find the as that matches the as number in asList
  let as = asList.find(as => as.number === asNumber)

  if (as) {
    as.name = newName
  }
}
