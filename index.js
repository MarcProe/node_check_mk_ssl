const ssllabs = require("node-ssllabs");

const hostname = process.argv[2];
const warndays = process.argv[3] ? process.argv[3] : 7;

ssllabs.scan(hostname, function (err, host) {
    let status = 3;
    let grades = "";
    let lowleft = -1;
    if (process.argv[4]) {
        console.log(err);
        console.log(host);
    }
    if (host && host != null) {
        if (host.endpoints) {
            host.endpoints.forEach(function (endpoint) {
                if (endpoint && endpoint.grade) {
                    if (endpoint.grade[0] === "A") {
                        status = 0;
                    } else if (endpoint.grade[0] === "B") {
                        status = 1;
                    } else {
                        status = 2;
                    }
                    grades = grades.concat(endpoint.grade, " ");
                }
            });
        } else {
            status = 3;
            grades = host.statusMessage;
        }
        if (host.certs) {
            host.certs.forEach((cert) => {
                const left = Math.floor(
                    (cert.notAfter - new Date()) / (1000 * 60 * 60 * 24)
                );
                if (lowleft === -1) {
                    lowleft = left;
                } else {
                    lowleft = left < lowleft ? left : lowleft;
                }
            });
        }
    } else {
        status = 3;
        grades = JSON.stringify(err);
    }
    if (grades === "") {
        grades = "No Rating";
    }

    if (lowleft < warndays) {
        status = 2;
    }

    console.log(
        status +
            " sslcert - " +
            hostname +
            " " +
            grades.trim() +
            " (Expire in " +
            lowleft +
            " days) https://www.ssllabs.com/ssltest/analyze.html?d=" +
            hostname
    );
});
