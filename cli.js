#!/usr/bin/env node

const { readFile } = require('fs/promises')

const main = async () => {
  let packageFilePath = 'package.json'
  const [, , ...args] = process.argv

  if (args[0]) packageFilePath = args[0]

  let data

  try {
    data = await readFile(packageFilePath)
  } catch (err) {
    console.error(`Error: No such file "${packageFilePath}"`)
    console.error(err)
    return
  }

  if (!data) return console.error('Error: No data')

  try {
    data = JSON.parse(data)
  } catch (err) {
    console.error(`Error: Failed to parse "${packageFilePath}"`)
    console.error(err)
    return
  }

  if (!data) return console.error('Error: No data')

  let devDependencies = []
  let dependencies = []

  if (data.devDependencies) devDependencies = Object.keys(data.devDependencies)
  if (data.dependencies) dependencies = Object.keys(data.dependencies)

  if (devDependencies.length)
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Install Dev Dependencies Command:\nnpm i -D ${devDependencies.join(
        ' '
      )}\n`
    )
  if (dependencies.length)
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Install Dependencies Command:\nnpm i ${dependencies.join(' ')}\n`
    )
}

main()
