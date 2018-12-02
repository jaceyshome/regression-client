let hostName = window.location.hostname;
// let hostName = '54.79.0.252';

module.exports = {
    env: 'DEV', //DEV or PROD
    //regression-test-server root path
    apiRootPath: `${window.location.protocol}//${hostName}:7071`,
    //regression-test-puppeteer server root path
    outputPath: `${window.location.protocol}//${hostName}:7080`,
};
