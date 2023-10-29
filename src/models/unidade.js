const { connection } = require('../database/connection');
const { INTEGER, STRING, BOOLEAN, DATE } = require('sequelize');

const Unidade = connection.define(
  'unidades',
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: STRING,
      allowNull: false,
    },
    address: {
      type: STRING,
      allowNull: false,
    },
    brand: {
      type: STRING,
      allowNull: false,
    },
    model: {
      type: STRING,
      allowNull: false,
    },
    active: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  },
  { underscored: true, paranoid: true }
);

module.exports = { Unidade };
