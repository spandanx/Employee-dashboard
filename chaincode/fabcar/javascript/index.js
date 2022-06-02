/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabCar = require('./lib/fabcar');
//const User = require('./lib/user');

module.exports.FabCar = FabCar;
//module.exports.User = User;
//module.exports.contracts = [ FabCar,User ];
module.exports.contracts = [ FabCar ];
