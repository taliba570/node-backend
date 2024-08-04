const argv = require("yargs").argv;

const { NODE_ENV = 'local', APP_PORT = '5000' } = process.env;

const packageInfo = require('../../package.json');

const loadConfigurationFromFile = async (
    pathToConfig = '../../config.json', 
    pathToSecretDir = '.'
) => {
    const paths = {
        config: pathToConfig,
        secrets: argv[1] || argv.secret || pathToSecretDir,
    };

    global.secrets_dir = paths.secrets;

    process.env.APP_ENVIRONMENT = NODE_ENV;
    process.env.APP_NAME = packageInfo.name.toUpperCase();
    process.env.APP_PORT = APP_PORT;
    process.env.APP_RELEASE = packageInfo.name + '@' + packageInfo.version;
    process.env.APP_VERSION = packageInfo.version
};

module.exports = {
    loadConfigurationFromFile,
};