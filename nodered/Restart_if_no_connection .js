/**
 * @copyright SWISSGLIDER
 * @license   MIT
 * @authors   https://github.com/swissglider
 *
 * This script checks if there is a connection to the network on an intervall,
 * if not the shelly will be restarted.
 * Version 1.0
 * Date: 2022/11/05
 */

// CONFIG START
// a remote URL with just a few bytes of content in order to check if internet is still available.
let remoteurl = 'http://192.168.80.10';
// number of times the check is done before internet is considered as down.
let maxfails = 2;
// checks the internet connection every x minutes, recommended is 5 or more
let interval = 5;
// CONFIG END

// no need to change anything below this line.
let alertTimer = '';
let failcounter = 0;

function startMonitor() {
    // print('script::restart::startMonitor');
    checkNetwork();
    alertTimer = Timer.set(interval * 60 * 1000, true, checkNetwork, null);
}

function checkNetwork() {
    // print('script::restart::checkNetwork1');
    Shelly.call(
        'HTTP.GET',
        {
            url: remoteurl,
        },
        function (res, error_code, error_msg, ud) {
            // print('script::restart::checkNetwork::call');
            // print('script::restart::checkNetwork::res:: ' + JSON.stringify(res));
            // print('script::restart::checkNetwork::error_code:: ' + JSON.stringify(error_code));
            // print('script::restart::checkNetwork::error_msg:: ' + JSON.stringify(error_msg));
            // print('script::restart::checkNetwork::ud:: ' + JSON.stringify(ud));
            let isCodeOK = res && res.code && (res.code === 200 || res.code === 301 || res.code === 308);
            if (!isCodeOK) {
                if (failcounter === maxfails) {
                    print('script::restart::Restart');
                    failcounter = 0;
                    restartRelay();
                } else {
                    print('script::restart::fail');
                    failcounter++;
                }
            } else {
                // print('script::restart::all ok');
            }
        },
        null,
    );
}

function restartRelay() {
    // print('script::restart::restartRelay');
    Shelly.call(
        'Shelly.Reboot',
        { delay_ms: 100 },
        function (result, code, msg, ud) {
            print('script::restart::restartRelay::result ' + JSON.stringify(result));
        },
        null,
    );
}

startMonitor();
