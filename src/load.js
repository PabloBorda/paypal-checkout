/* @flow */

let { beacon, checkpoint } = require('./lib/beacon');

if (window.paypal && window.paypal.version === __MINOR_VERSION__) {

    checkpoint('load_again');

    let error = 'PayPal Checkout Integration Script already loaded on page';

    if (window.console) {
        if (window.console.warn) {
            window.console.warn(error);
        } else {
            window.console.log(error);
        }
    }

} else {

    try {

        let { extendNamespace } = require('./lib/namespace');
        let { uniqueID } = require('./lib/util');

        window.pp_uid = window.pp_uid || uniqueID();
        checkpoint('load');

        let _interface = require('./index');

        extendNamespace(_interface, [ 'paypal', 'PAYPAL' ], [ 'apps' ]);

    } catch (err) {

        beacon('bootstrap_error', {
            message: err ? err.toString() : 'undefined',
            stack: err.stack || err.toString(),
            errtype: ({}).toString.call(err)
        });

        throw err;
    }
}
