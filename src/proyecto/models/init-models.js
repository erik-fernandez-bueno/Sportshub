var DataTypes = require("sequelize").DataTypes;
var _detallfactura = require("./detallfactura");
var _factura = require("./factura");
var _productes = require("./productes");

function initModels(sequelize) {
  var detallfactura = _detallfactura(sequelize, DataTypes);
  var factura = _factura(sequelize, DataTypes);
  var productes = _productes(sequelize, DataTypes);

  factura.belongsToMany(productes, { as: 'id_prod_productes', through: detallfactura, foreignKey: "id_fact", otherKey: "id_prod" });
  productes.belongsToMany(factura, { as: 'id_fact_facturas', through: detallfactura, foreignKey: "id_prod", otherKey: "id_fact" });
  detallfactura.belongsTo(factura, { as: "id_fact_factura", foreignKey: "id_fact"});
  factura.hasMany(detallfactura, { as: "detallfacturas", foreignKey: "id_fact"});
  detallfactura.belongsTo(productes, { as: "id_prod_producte", foreignKey: "id_prod"});
  productes.hasMany(detallfactura, { as: "detallfacturas", foreignKey: "id_prod"});

  return {
    detallfactura,
    factura,
    productes,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
