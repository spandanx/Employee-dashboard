/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class EmployeeCC extends Contract {

	async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const accounts = [
            {
		employee_id: 'emp101',
                name: 'Paul',
                title: 'Adams',
		birthday: '20000602',
		year: '2000',
		month: '06',
		day: '08',
		position: 'Engineer'
            },
            {
		employee_id: 'emp102',
                name: 'Mike',
                title: 'Watson',
		birthday: '20000602',
		year: '2000',
		month: '06',
		day: '08',
		position: 'Engineer'
            }
        ];

        for (let i = 0; i < accounts.length; i++) {
            await ctx.stub.putState(accounts[i].employee_id, Buffer.from(JSON.stringify(accounts[i])));
            console.info('Added <--> ', accounts[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

	async registerEmployee(ctx, employee_id, name, title, birthday, year, month, day, position) {
		const empAsBytes = await ctx.stub.getState(employee_id); // check if user exists
		if (!empAsBytes || empAsBytes.length === 0) {
			const obj = 
			{
				employee_id: employee_id,
				name: name,
				title: title,
				birthday: title,
				year: year,
				month: month,
				day: day,
				position: position
			}
			await ctx.stub.putState(employee_id, Buffer.from(JSON.stringify(obj)));
		}
		else{
			throw new Error(`${employee_id} already exists`);
		}
	}
	async getEmployee(ctx, employee_id) {
	        console.info('getEmployee() called');
		const empAsBytes = await ctx.stub.getState(employee_id);

		if (!empAsBytes || empAsBytes.length === 0) {
			console.info('user does not exist ');
			throw new Error(`${employee_id} does not exist`);
		}
		console.log(empAsBytes);
		let data = Buffer.from(empAsBytes).toString('utf8')
		console.log(data);
		console.log(JSON.stringify(data));
		return JSON.stringify(data);
	}
	async getAllEmployees(ctx) {
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
	async getEmployeeByMonthDay(ctx, month, day, pageNumber, pageSize) {
	        const startKey = '';
		const endKey = '';
		const allResults = [];

		pageSize = Number(pageSize);
		const offSet = pageNumber*pageSize;

		let query = 
		{
		   "selector": {
		      "month": {
			 "$eq": month
		      },
		      "day": {
			 "$eq": day
		      }
		   },
		   "limit": pageSize,
		   "skip": offSet
		};
		console.log(query);
		console.log(JSON.stringify(query));
		for await (const {key, value} of ctx.stub.getQueryResult(JSON.stringify(query))) {
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
	async getEmployeeByMonthDayPagination(ctx, month, day, pageSize, bookmark) {
	        const startKey = '';
		const endKey = '';
		const allResults = [];

		pageSize = Number(pageSize);

		let query = 
		{
		   "selector": {
		      "month": {
			 "$eq": month
		      },
		      "day": {
			 "$eq": day
		      }
		   }
		};
		console.log(query);
		console.log(JSON.stringify(query));
		for await (const {key, value} of ctx.stub.getQueryResultWithPagination(JSON.stringify(query), pageSize, bookmark)) {
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
	async executeQuery(ctx, query) {
		console.log("Calling executeQuery()");
		console.log(query);
		
		for await (const {key, value} of ctx.stub.getQueryResult(query)) {
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

module.exports = EmployeeCC;
