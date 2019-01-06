// @flow weak

import path from 'path'
import fs from 'fs'

module.exports = function() {}

// the loader only use the 
module.exports.pitch = function pitch() {
  // Makes the loader asyn.
  const callback = this.async()
  const templatePath = path.join(__dirname, './worker.js')

  // Make this loader cacheable.
  this.cacheable()
  // Explicit the cache dependency.
  this.addDependency(templatePath)

  fs.readFile(templatePath, 'utf-8', (err, template) => {
    if (err) {
      callback(err)
      return
    }

    const source = `
      var swPath = '${this.query.slice(1)}';
      ${template}
    `.trim()
    callback(null, source)
  })
}
