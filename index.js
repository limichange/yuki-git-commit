#!/usr/bin/env node
const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')
const program = require('commander')
const questions = require('./questions')
const ora = require('ora')
require('shelljs/global')
require('console.table')

console.log(
  chalk.green(
    figlet.textSync('Yuki Git Commit', { horizontalLayout: 'full' })
  )
)

program
  .version('0.0.1')
  .option('-nc, --no-content', 'No content')
  .parse(process.argv)

inquirer.prompt(questions).then((res) => {
  console.log('\n')
  console.table(res)

  const commitMessage = `${res.commitType.split('-')[0]} - ${res.messageTitle}\n${res.messageContent}`

  if (res.addAllFiles) {
    exec('git add --all')
  }

  exec(`git commit -m "${commitMessage}"`)

  if (res.pushRightNow) {
    console.log('\nPush Push Push ... \n')
    exec('git push')
  }
})
