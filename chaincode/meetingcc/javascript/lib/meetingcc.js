/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MeetingCC extends Contract {

	async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
	//await ctx.stub.putState('length', Buffer.from(2));
        const meetings = [
            {
		id: '1',
		title: 'Employee helpline',
                from: '1654270200',
		to: '1654272000',
		host: 'admin',
		link: 'meet_abc'
            },
            {
		id: '2',
		title: 'Weekend party',
                from: '1654279200',
		to: '1654282800',
		host: 'admin',
		link: 'meet_cde'
            }
        ];

        for (let i = 0; i < meetings.length; i++) {
            await ctx.stub.putState(meetings[i].id, Buffer.from(JSON.stringify(meetings[i])));
            console.info('Added <--> ', meetings[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

	async createMeeting(ctx, id, title, from, to, host, link) {
		const bytes = await ctx.stub.getState(id); // check if user exists
		if (!bytes || bytes.length === 0) {
			const obj = 
			{
				id: id,
				title: title,
				from: from,
				to: to,
				host: host,
				link: link
			    }
			await ctx.stub.putState(id, Buffer.from(JSON.stringify(obj)));
		}
		else{
			throw new Error(`${employee_id} already exists`);
		}
	}
	async getMeetings(ctx, id) {
	        console.info('getEmployee() called');
		const newsAsBytes = await ctx.stub.getState(id);

		if (!newsAsBytes || newsAsBytes.length === 0) {
			console.info('news does not exist ');
			throw new Error(`${id} does not exist`);
		}
		console.log(newsAsBytes);
		let data = Buffer.from(newsAsBytes).toString('utf8');
		console.log(data);
		console.log(JSON.stringify(data));
		return JSON.stringify(data);
	}
	async getAllMeetings(ctx) {
		const startKey = '';
		const endKey = '';
		const allResults = [];
		for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
		    const strValue = Buffer.from(value).toString('utf8');
		    let record;
		    try {
		        record = JSON.parse(strValue);
		    } catch (err) {
		        console.log(err);
		        record = strValue;
		    }
		    allResults.push({ Key: key, Record: record });
		}
		console.info(allResults);
		return JSON.stringify(allResults);
	}
}

module.exports = MeetingCC;
