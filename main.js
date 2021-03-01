const manager = require('./DatabaseManager'); //Has get_password, update_password, add_password, remove_password

manager.get_password("demo", "second", (result) => { 
    console.log(result);
    process.exit();
});