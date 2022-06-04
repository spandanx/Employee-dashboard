const { ChaincodeMockStub, Transform } = require("@theledger/fabric-mock-stub");
const { MyChaincode } = require('../../../newscc/javascript/bin/newscc.js');

// You always need your chaincode so it knows which chaincode to invoke on
const chaincode = new MyChaincode();

describe('Test MyChaincode', () => {

    it("Should be able to add car", async () => {
        const mockStub = new ChaincodeMockStub("MyMockStub", chaincode);

        const response = await mockStub.mockInvoke("tx1", ['createCar', `CAR0`, `prop1`, `prop2`, `prop3`, `owner`]);

        expect(response.status).to.eql(200)

        response = await mockStub.mockInvoke("tx1", ['queryCar', `CAR0`]);

        expect(Transform.bufferToObject(response.payload)).to.deep.eq({
            'make': 'prop1',
            'model': 'prop2',
            'color': 'prop3',
            'owner': 'owner',
            'docType': 'car'
        })
    });
});
