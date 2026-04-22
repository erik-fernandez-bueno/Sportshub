const DataTypes = require('sequelize');
const getmodelaFactura = (db) => {
  return db.define('factura', {
    id_factures: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuariemail: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'factura',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_factures" },
        ]
      },
    ]
  });
};
module.exports = {getmodelaFactura};
