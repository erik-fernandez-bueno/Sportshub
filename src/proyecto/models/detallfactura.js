const DataTypes = require('sequelize');
const getmodetallsfactura =(db) => {
  return db.define('detallfactura', {
    id_fact: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'factura',
        key: 'id_factures'
      }
    },
    id_prod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'productes',
        key: 'id_productes'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    size: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'detallfactura',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_fact" },
          { name: "id_prod" },
        ]
      },
      {
        name: "fk_detallfactura_productes",
        using: "BTREE",
        fields: [
          { name: "id_prod" },
        ]
      },
    ]
  });
};
module.exports = {getmodetallsfactura};
