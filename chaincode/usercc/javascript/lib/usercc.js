/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class UserCC extends Contract {

	async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const accounts = [
            {
                username: 'admin',
                password: 'adminpw',
            },
            {
                username: 'admin2',
                password: 'admin2pw',
            }
        ];

        for (let i = 0; i < accounts.length; i++) {
            await ctx.stub.putState(accounts[i].username, Buffer.from(JSON.stringify(accounts[i].password)));
            console.info('Added <--> ', accounts[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

	async registerUser(ctx, username, password) {
		const pwdAsBytes = await ctx.stub.getState(username); // check if user exists
		if (!pwdAsBytes || pwdAsBytes.length === 0) {
			await ctx.stub.putState(username, Buffer.from(JSON.stringify(password)));
		}
		else{
			throw new Error(`${username} already exists`);
		}
	}

	async authenticate(ctx, username, password) {
	        console.info('authenticate() called');
		const pwdAsBytes = await ctx.stub.getState(username); // check if user exists

		if (!pwdAsBytes || pwdAsBytes.length === 0) {
			console.info('user does not exist ');
			return false;
		}
		else{
			let pwdAsBytesString = pwdAsBytes.toString();
			pwdAsBytesString = pwdAsBytesString.replace(/"/g, '');
			if (pwdAsBytesString==password){
				console.info('password matched');
				return true;
			}
			else{
				console.info('password did not match');
			}
		}
		return false;
	}
}

module.exports = UserCC;
