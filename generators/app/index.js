"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const glob = require("glob");
const { resolve } = require("path");
const remote = require("yeoman-remote");
const yoHelper = require("@feizheng/yeoman-generator-helper");

module.exports = class extends Generator {
  initializing() {
    this.composeWith("dotfiles:stdapp");
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stunning ${chalk.red(
          "generator-tampermonkey"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "scope",
        message: "Your scope?(eg: like `@babel`)",
        default: 'feizheng'
      },
      {
        type: "input",
        name: "project_name",
        message: "Your project_name (eg: like this `react-button` )?",
        default: yoHelper.discoverRoot
      },
      {
        type: "input",
        name: "description",
        message: "Your description?"
      }
    ];

    return this.prompt(prompts).then(
      (props) => {
        // To access props later use this.props.someAnswer;
        this.props = props;
        yoHelper.rewriteProps(props);
      }
    );
  }

  install() {
    this.npmInstall();
  }

  writing() {
    const done = this.async();
    remote(
      "afeiship",
      "boilerplate-tampermonkey",
      (err, cachePath) => {
        // copy files:
        this.fs.copyTpl(
          glob.sync(resolve(cachePath, "{**,.*}")),
          this.destinationPath(),
          this.props
        );
        done();
      }
    );
  }
};
