const Sequelize = require("sequelize")
const crearConfigBaseDades = () =>{
  return new Sequelize ("sportshubbd","root","1234qwer",{
    host: "localhost",
    dialect: "mysql",
  });
}
module.exports = {crearConfigBaseDades}
