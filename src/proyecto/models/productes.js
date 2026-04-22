const DataTypes = require('sequelize');
const getmodelProductes =(db) => {
  return db.define('productes', {
    id_productes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    size: {
      type: DataTypes.JSON,
      allowNull: false
    },
    category: {
      type: DataTypes.JSON,
      allowNull: false
    },
    sexe: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'productes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_productes" },
        ]
      },
    ]
  });
};
module.exports = {getmodelProductes};
