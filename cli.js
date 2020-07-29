#!/usr/bin/env node
const path = require('path')
const inquirer = require('inquirer')
const fs = require('fs')
const ejs = require('ejs')

inquirer.prompt([{
  type: 'input',
  name: 'name',
  message: 'Your project name?'
}])
  .then((answers) => {
    const tmpDir = path.join(__dirname, 'templates')
    const destDir = process.cwd()
    fs.readdir(tmpDir, (err, files) => {
      if (err) throw (err)
      files.forEach((item) => {
        ejs.renderFile(path.join(tmpDir, item), answers, (err, result) => {
          if (err) throw err
          fs.writeFileSync(path.join(destDir, item), result)
        })
      })
    })
  })