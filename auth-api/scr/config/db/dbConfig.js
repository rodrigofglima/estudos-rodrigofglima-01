import Sequelize from "sequelize";

const sequelize = new Sequelize("auth-db", "postgres", "123456", {
    host: "localhost",
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        freezeTableName: true
    }
});

sequelize
.authenticate()
.then(() => {
    console.info('Conexão extabelecida');
})
.catch((err) => {
    console.error("Unable to connect");
    console.error(err.message)
})

export default sequelize;
