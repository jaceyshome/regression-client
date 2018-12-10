// let hostName = window.location.hostname;
let hostName = 'aemrpa00001.srv.sydney.edu.au';

module.exports = {
    env: 'DEV', //DEV or PROD
    //regression-test-server root path
    apiRootPath: `${window.location.protocol}//${hostName}:7071`,
    //regression-test-puppeteer server root path
    outputPath: `${window.location.protocol}//${hostName}:7080`,
};
