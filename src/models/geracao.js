const { INTEGER, DATE, FLOAT, STRING } = require('sequelize');
const { connection } = require('../database/connection');

const Record = connection.define(
  'records',
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_unidade: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'unidades',
          },
          key: 'id',
        },
        allowNull: false,
      },
    reference_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    totalGenerated: {
        type: STRING,
        allowNull: false,
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true }
);

module.exports = { Record };
