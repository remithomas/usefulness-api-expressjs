process.env.NODE_ENV = 'test';

const { describe, beforeEach, afterEach, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../app');
const usersData = require('../util/users-data');

describe('Integration - Routes : user', () => {

	describe('With credential', () => {
		let token = null;
		const AuthHelper = require('../../helpers/auth');

		beforeEach(() => {
			token = AuthHelper.generateToken(usersData.user1);
		});

		afterEach(() => {
			token = null;
		});

		it('it should access user (me)', (done) => {
			chai.request(server)
				.get('/me')
				.set('Authorization', 'Bearer ' + token)
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});

	describe('Without credential', () => {
		it('it should deny access to user (me)', (done) => {
			chai.request(server)
				.get('/me')
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});
});
