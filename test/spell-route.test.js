'use strict';

const app = require('../server');
const request = require('supertest')(app);
const { expect } = require('chai');
const debug = require('debug')('app:test/spell');
require('../lib/mongoose-connect');
const helper = require('./test-helper');


describe('Spell Routes',function(){

  afterEach(function(){
    return helper.kill;
  });
  describe('POST /api/spell',function(){
    it('should return 200 if it saves a new spell',function(){
      return request.post(`/api/spell`)
        .send(helper.spell)
        .expect(200)
        .expect(res => {
          debug(res.body.name);
          expect(res.body.name).to.equal('Donkey Fart');
          expect(res.body.description).to.not.be.null;
        });
    });
    it('should return 400 if no body is provided',function(){
      return request.post('/api/spell')
        .send()
        .expect(400);
    });
  });
});