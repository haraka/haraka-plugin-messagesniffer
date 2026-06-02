const assert = require('node:assert/strict')
const { beforeEach, describe, it } = require('node:test')

// npm modules
const { makeConnection, makePlugin } = require('haraka-test-fixtures')

// start of tests
//    assert: https://nodejs.org/api/assert.html

let plugin

beforeEach(() => {
  plugin = makePlugin('messagesniffer', { register: false })
})

describe('messagesniffer', () => {
  it('loads', () => {
    assert.ok(plugin)
  })
})

describe('load_messagesniffer_ini', () => {
  it('loads messagesniffer.ini from config/messagesniffer.ini', () => {
    plugin.load_messagesniffer_ini()
    assert.ok(plugin.cfg)
  })
})

describe('uses text fixtures', () => {
  it('sets up a connection', () => {
    const connection = makeConnection()
    assert.ok(connection.server)
  })

  it('sets up a transaction', () => {
    const connection = makeConnection({ withTxn: true })
    assert.ok(connection.transaction.header)
  })
})

describe('load_messagesniffer_ini hot-reload', () => {
  it('passes a watchCb to config.get', () => {
    let captured
    plugin.config.get = (name, opts) => {
      if (typeof opts === 'function') captured = opts
      return { main: {} }
    }
    plugin.load_messagesniffer_ini()
    assert.equal(typeof captured, 'function')
  })
})
