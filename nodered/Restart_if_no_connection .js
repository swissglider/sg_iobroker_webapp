/**
 * @copyright SWISSGLIDER
 * @license   MIT
 * @authors   https://github.com/swissglider
 *
 * This script checks if there is a connection to the network on an intervall,
 * if not the shelly will be restarted.
 */

// CONFIG START
// a remote URL with just a few bytes of content in order to check if internet is still available.
let remoteurl = 'http://192.168.80.1';
// number of times the check is done before internet is considered as down.
let maxfails = 2;
// checks the internet connection every x minutes, recommended is 5 or more
let interval = 5;
// CONFIG END

// no need to change anything below this line.
let alertTimer = '';
let failcounter = 0;

function startMonitor() {
    //   checkNetwork();
    alertTimer = Timer.set(interval * 60 * 1000, true, checkNetwork, null);
}

function checkNetwork() {
    Shelly.call(
        'HTTP.GET',
        {
            url: remoteurl,
        },
        function (res, error_code, error_msg, ud) {
            if (res.code !== 200) {
                if (failcounter === maxfails) {
                    print('Restart');
                    restartRelay();
                    failcounter = 0;
                } else {
                    print('fail');
                    failcounter++;
                }
            } else {
                // print('all ok');
            }
        },
        null,
    );
}

function restartRelay() {
    // print('hallloooooo');
    Shelly.call(
        'Shelly.Reboot',
        { delay_ms: 100 },
        function (result, code, msg, ud) {
            print(JSON.stringify(result));
        },
        null,
    );
}

startMonitor();
