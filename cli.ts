#!/usr/bin/env node

import { promises as fsPromises } from 'fs';

interface PackageJson {
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;
}

const main = async (): Promise<void> => {
  let packageFilePath = 'package.json';
  const [, , ...args] = process.argv;

  if (args[0]) packageFilePath = args[0];

  let data: Buffer;

  try {
    data = await fsPromises.readFile(packageFilePath);
  } catch (err) {
    console.error(`Error: No such file "${packageFilePath}"`);
    console.error(err);
    return;
  }

  if (!data) return console.error('Error: No data');

  let jsonData: PackageJson;

  try {
    jsonData = JSON.parse(data.toString());
  } catch (err) {
    console.error(`Error: Failed to parse "${packageFilePath}"`);
    console.error(err);
    return;
  }

  if (!jsonData) return console.error('Error: No data');

  let devDependencies: string[] = [];
  let dependencies: string[] = [];

  if (jsonData.devDependencies) devDependencies = Object.keys(jsonData.devDependencies);
  if (jsonData.dependencies) dependencies = Object.keys(jsonData.dependencies);

  if (devDependencies.length)
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Install Dev Dependencies Command:\nnpm i -D ${devDependencies.join(
        ' '
      )}\n`
    );
  if (dependencies.length)
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Install Dependencies Command:\nnpm i ${dependencies.join(' ')}\n`
    );
};
console.log('ts works fine');

main();
