const Sequelize = require("sequelize")
const crearConfigBaseDades = () =>{
  return new Sequelize ("sportshubbd","root","Admin_123",{
    host: "localhost",
    dialect: "mysql",
  });
}
module.exports = {crearConfigBaseDades}
