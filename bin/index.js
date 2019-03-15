#!/usr/bin/env node

const program = require('commander')
const config = require('../config')

program
.version(config.version, '-v, --version')
.description('私有脚手架练习')

.command('create', '初始化目录文件')
.parse(process.argv);