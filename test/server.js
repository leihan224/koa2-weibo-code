/**
 * @description jest server
 * @author 雷涵
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)