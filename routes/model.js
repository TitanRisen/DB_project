var Sequelize = require('sequelize');
var config = {
    host: 'localhost',
    username: 'root',
    database: 'mydb',
    password: 'djy2080683', // 口令
    port: 3306 // 端口号，MySQL默认3306
}
//创建sequelize对象
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    omitNull: true
});
var model = {};
//for raw queries
model.sequelize = sequelize;

//账户 
model.account = sequelize.define('account', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account: Sequelize.STRING(50),
    password: Sequelize.STRING(50),
    account_type: Sequelize.INTEGER
},
    {
        // 不要加s
        'freezeTableName': true,
        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': false
    });

//专家
model.expert = sequelize.define('expert', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    expert_credential_id: Sequelize.STRING(50),
    status: Sequelize.INTEGER,
    //DATEONLY不起作用
    expert_credential_expire: Sequelize.DATEONLY,
    name: Sequelize.STRING(50),
    gender: Sequelize.INTEGER,
    born_date: Sequelize.DATEONLY,
    photo: Sequelize.STRING(50),
    political_status: Sequelize.INTEGER,
    credential_type: Sequelize.INTEGER,
    certificate_authority: Sequelize.STRING(50),
    credential_ID: Sequelize.STRING(50),
    academic_qualification: Sequelize.STRING(50),
    academic_degree: Sequelize.STRING(50),
    professional_rank: Sequelize.STRING(50),
    post: Sequelize.STRING(50),
    work_time: Sequelize.STRING(50),
    retired: Sequelize.INTEGER,
    part_time: Sequelize.INTEGER,
    work_unit: Sequelize.STRING(50),
    address: Sequelize.STRING(50),
    zip_code: Sequelize.INTEGER,
    email: Sequelize.STRING(50),
    phone_number: Sequelize.BIGINT,
    graduate_institution: Sequelize.STRING(50),
    speciality: Sequelize.STRING(300),
    achievement: Sequelize.STRING(300),
    supplement: Sequelize.STRING(300)
},
    {
        // 不要加s
        'freezeTableName': true,
        // 是否需要增加createdAt、updatedAt、deletedAt字段
        'timestamps': false
    });

module.exports = model;