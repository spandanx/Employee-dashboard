/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class User extends Contract {

	async initLedger(ctx) {
	}

	async registerUser(ctx, username, password) {
		const pwdAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
		if (!pwdAsBytes || pwdAsBytes.length === 0) {
			await ctx.stub.putState(username, Buffer.from(JSON.stringify(password)));
		}
		else{
			throw new Error(`${username} already exists`);
		}
	}

	async authenticate(ctx, username, password) {
		const pwdAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
		if (!pwdAsBytes || pwdAsBytes.length === 0) {
			return false;
		}
		else{
			if (pwdAsBytes.toString()==password){
				return true;
			}
		}
		return false;
	}
}

module.exports = FabCar;
