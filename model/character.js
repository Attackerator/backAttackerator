'use strict';

const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const debug = require('debug')('app:model/character');

const characterSchema = {
  user: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  stats: { type: Schema.Types.ObjectId },
  skills: { type: Schema.Types.ObjectId },
  saves: { type: Schema.Types.ObjectId },
  spells: { type: Schema.Types.ObjectId },
  attack: { type: Schema.Types.ObjectId },
  sayings: { type: Schema.Types.ObjectId }
};

const Character = module.exports = mongoose.models.character || mongoose.model('Character',characterSchema);

Character.createCharacter = function(character){
  debug(character);
  return new Character(...character).save();
};
