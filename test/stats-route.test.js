'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');

require('../lib/mongoose-connect');
const helper = require('./test-helper');
const User = require('../model/user');
const Character = require('../model/character');



describe('stats routes', function() {
  describe('POST /api/stats', function() {
    describe('with a valid body', function() {
      beforeEach(function () {
        return User.createUser(helper.user)
          .then(user => this.testUser = user)
          .then(user => user.generateToken())
          .then(token => this.testToken = token);
      });

      beforeEach(function () {
        helper.character.userId = this.testUser._id;
        return Character.createCharacter(helper.character)
          .then(character => {
            this.testCharacter = character;
          });
      });

      afterEach(function () {
        return helper.kill();
      });

      it('should return stats', function () {
        return request
          .post(`/api/stats/${this.testCharacter._id}`)
          .set({'Authorization': `Bearer ${this.testToken}`})
          .send({ strength: 3})
          .expect(200)
          .expect(res => {
            expect(res.body.strength).to.equal(3);
          });
      });
    });
  });
});
