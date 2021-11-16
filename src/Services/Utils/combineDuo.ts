export const combineDuo = <T>(arr: T[][]) => {
  const combinations: [T, T][] = []

  for (let i = 0; i < arr.length; i++) {
    const currentGroup = arr[i]
    for (const currentGroupElement of currentGroup) {
      const nextGroups = arr.slice(i + 1)
      for (const nextGroup of nextGroups) {
        for (const nextGroupElement of nextGroup) {
          combinations.push([currentGroupElement, nextGroupElement])
        }
      }
    }
  }

  return combinations
}
