[![CodeQL](https://github.com/MarcProe/node_check_mk_ssl/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/MarcProe/node_check_mk_ssl/actions/workflows/codeql-analysis.yml)
[![Codacy Security Scan](https://github.com/MarcProe/node_check_mk_ssl/actions/workflows/codacy-analysis.yml/badge.svg)](https://github.com/MarcProe/node_check_mk_ssl/actions/workflows/codacy-analysis.yml)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
# nodecheckssl
 Simple test to get a rating for a HTTPS website from ssllabs.com, for use in check_mk

Use <https://badssl.com/> for test cases.

# Installation

`sudo npm i -g`

# Usage
 `nodecheckssl host.com n`

The check will return `OK` for any `A` rating, `WARN` for any `B` rating and `CRIT` for any other rating.
The test will return `CRIT` if any certificate will expire in less than `n` days. Default is 7.

# Disclaimer

This whole thing is not very sophisticated and will fail miserably if given bad parameters and most likely in a lot of other cases.
