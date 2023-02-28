export default function useGenerator() {
  const generateCategoryID = (): string => {
    // Generate 2 random uppercased letters
    let id = ''
    for (let i = 0; i < 2; i++) {
      // Generate a random number between 65 and 90 (the ASCII codes for A-Z)
      const letterCode = Math.floor(Math.random() * (90 - 65 + 1)) + 65
      // Convert the number to a letter and add it to the ID
      id += String.fromCharCode(letterCode)
    }

    // Generate 4 random numbers
    id += Math.floor(1000 + Math.random() * 9000).toString()

    return id
  }

  return {
    generateCategoryID
  }
}
