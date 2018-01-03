var Sequelize = require('sequelize');

var configs = {
  "local": {
    "username": "root",
    "password": null,
    "database": "petLegacyDB",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};

if (process.env.JAWSDB_URL) {
  var petLegacyDB = new Sequelize(process.env.JAWSDB_URL);
} else {
  var petLegacyDB = new Sequelize(configs['local'].database,
  configs['local'].username, configs['local'].password, configs['local']);
}

var owners = petLegacyDB.define('owners', {
  first_name: Sequelize.STRING(100),
  last_name: Sequelize.STRING(100),
  address: Sequelize.STRING(100),
  zip_code: Sequelize.STRING(10),
  country: Sequelize.STRING(50),
  email: {
    type: Sequelize.STRING(40), unique: true
  },
  phone: Sequelize.STRING(20)
});

var pets = petLegacyDB.define('pets', {
  owner_id: Sequelize.INTEGER,
  first_name: Sequelize.STRING(100),
  last_name: Sequelize.STRING(100),
  AKC_registered_name: Sequelize.STRING(100),
  breed: Sequelize.STRING(50),
  zip_code: Sequelize.STRING(10),
  birthdate: Sequelize.DATE,
  gender: Sequelize.STRING(10),
  pic: Sequelize.STRING(255)
});



petLegacyDB.sync().then(function() {
  // The line below for test purposes
  // petLegacyTests();
});

function petLegacyTests() {
  // Create a test user
  owners.create({
    email: 'kelly@petlegacy.com',
    last_name: 'rene',
    first_name: 'kelly',
    phone: '123-456-7890',
  })
  .then(function(results) {
    console.log("Results:", results.get({plain: true}));
    console.log("----------");
    // Update the email for the user
    var userId = results.id;
    owners.update({
      email: 'kelly@imnotyourpet.com'
    }, {
      where: {
        id: userId
      }
    })
    .then(function(results) {
      console.log("Results:", results);
      console.log("----------");
      // Remove the user from the db
      owners.destroy({
        where: {
          id: userId
        }
      })
      .then(function(results) {
        console.log("Results:", results);
        console.log("----------");
      });
    });
  });
}

var db = {
	owners: owners,
  pets: pets,
};
module.exports = db;
