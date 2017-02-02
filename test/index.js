const assert = require('node:assert/strict')
const { beforeEach, describe, it } = require('node:test')

// npm modules
const fixtures = require('haraka-test-fixtures')

// start of tests
//    assert: https://nodejs.org/api/assert.html

beforeEach(function () {
  this.plugin = new fixtures.plugin('messagesniffer')
})

describe('messagesniffer', function () {
  it('loads', function () {
    assert.ok(this.plugin)
  })
})

describe('load_messagesniffer_ini', function () {
  it('loads messagesniffer.ini from config/messagesniffer.ini', function () {
    this.plugin.load_messagesniffer_ini()
    assert.ok(this.plugin.cfg)
  })
})

describe('uses text fixtures', function () {
  it('sets up a connection', function () {
    this.connection = fixtures.connection.createConnection({})
    assert.ok(this.connection.server)
  })

  it('sets up a transaction', function () {
    this.connection = fixtures.connection.createConnection({})
    this.connection.transaction = fixtures.transaction.createTransaction({})
    assert.ok(this.connection.transaction.header)
  })
})
