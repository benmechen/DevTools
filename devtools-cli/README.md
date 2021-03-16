devtools-cli
============

DevTools CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/devtools-cli.svg)](https://npmjs.org/package/devtools-cli)
[![Downloads/week](https://img.shields.io/npm/dw/devtools-cli.svg)](https://npmjs.org/package/devtools-cli)
[![License](https://img.shields.io/npm/l/devtools-cli.svg)](https://github.com/benmechen/DevTools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g devtools-cli
$ dev COMMAND
running command...
$ dev (-v|--version|version)
devtools-cli/0.0.1 darwin-x64 node-v15.5.1
$ dev --help [COMMAND]
USAGE
  $ dev COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dev hello [FILE]`](#dev-hello-file)
* [`dev help [COMMAND]`](#dev-help-command)

## `dev hello [FILE]`

describe the command here

```
USAGE
  $ dev hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ dev hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/benmechen/DevTools/blob/v0.0.1/src/commands/hello.ts)_

## `dev help [COMMAND]`

display help for dev

```
USAGE
  $ dev help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
