let hostName = window.location.hostname;

module.exports = {
    env: 'DEV', //DEV or PROD
    //regression-test-server root path
    apiRootPath: `${hostName}:7071`,
    //regression-test-puppeteer server root path
    outputPath: `${hostName}:7080`,
};
