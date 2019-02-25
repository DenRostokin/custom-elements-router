const karmaBaseConfig = require('./karmaBase.conf')

module.exports = function(config) {
    config.set(Object.assign({}, karmaBaseConfig(config), { singleRun: false }))
}
