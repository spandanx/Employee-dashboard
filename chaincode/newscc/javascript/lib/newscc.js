/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class NewsCC extends Contract {

	async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
	//await ctx.stub.putState('length', Buffer.from(2));
        const news = [
            {
		id: '1',
		title: 'Alert: payslip generated',
                body: 'Hi, you payslip for the month June, 22 has been generated',
                author: 'admin',
		date: '1654270959'
	    },
            {
		id: '2',
		title: 'Notification: Please submit time sheet',
                body: 'Hi, Friday it is! Please dont forget to submit your time sheet',
                author: 'admin',
		date: '1654270959'
	    }
        ];

        for (let i = 0; i < news.length; i++) {
            await ctx.stub.putState(news[i].id, Buffer.from(JSON.stringify(news[i])));
            console.info('Added <--> ', news[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

	async createNews(ctx, id, title, body, author, date) {
		const empAsBytes = await ctx.stub.getState(id); // check if user exists
		if (!empAsBytes || empAsBytes.length === 0) {
			const obj = 
			{
				id: id,
				title: title,
				body: body,
				author: author,
				date: date
			}
			await ctx.stub.putState(id, Buffer.from(JSON.stringify(obj)));
		}
		else{
			throw new Error(`${employee_id} already exists`);
		}
	}
	async getNews(ctx, id) {
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
	async getAllNews(ctx) {
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

module.exports = NewsCC;
