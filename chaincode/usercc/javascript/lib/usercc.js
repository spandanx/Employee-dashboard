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
		role: 'admin'
            },
            {
                username: 'admin2',
                password: 'admin2pw',
		role: 'admin'
            },
	    {
                username: 'user1',
                password: 'user1pw',
		role: 'user'
            }
        ];

        for (let i = 0; i < accounts.length; i++) {
            await ctx.stub.putState(accounts[i].username, Buffer.from(JSON.stringify(accounts[i])));
            console.info('Added <--> ', accounts[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
	async registerUser(ctx, username, password, role) {
		const pwdAsBytes = await ctx.stub.getState(username); // check if user exists
		if (!pwdAsBytes || pwdAsBytes.length === 0) {
			let user = {
				username: username,
				password: password,
				role: role
			    }
			await ctx.stub.putState(username, Buffer.from(JSON.stringify(user)));
		}
		else{
			throw new Error(`${username} already exists`);
		}
	}

	async authenticate(ctx, username, password) {
	        console.info('authenticate() called');
		const pwdAsBytes = await ctx.stub.getState(username); // check if user exists
		let response = {status: false, role: ''};
		if (!pwdAsBytes || pwdAsBytes.length === 0) {
			console.info('user does not exist ');
			return response;
		}
		else{
			let pwdAsBytesString = pwdAsBytes.toString();
			let jsonObj = JSON.parse(pwdAsBytesString);
			pwdAsBytesString = jsonObj.password.replace(/"/g, '');
			if (pwdAsBytesString==password){
				console.info('password matched');
				response.status = true;
				response.role = jsonObj.role;
				return response;
			}
			else{
				console.info('password did not match');
			}
		}
		return response;
	}
	async checkIfExists(ctx, username) {
	        console.info('checkIfExists() called');
		const pwdAsBytes = await ctx.stub.getState(username); // check if user exists
		if (!pwdAsBytes || pwdAsBytes.length === 0) {
			return false;
		}
		else{
			return true;
		}
	}
}

module.exports = UserCC;
