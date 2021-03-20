var mysql = require('mysql');

var database_connection = mysql.createConnection({
  host: "localhost",
  user: "devesh",
  password: "basic",
  database: "main"
});

let table_name = "passwords";

database_connection.connect( err => {
    if(err) {
        throw err;
    } else {
        console.log("Connection established");
    }
});

function get_information(user_name, label, result_callback) {
    let check_pressence = `SELECT * FROM ${table_name} WHERE ( user_id = '${user_name}' AND description = '${label}' );`;
    database_connection.query(check_pressence, (err, results, fields) => {
        if(err) { 
            result_callback(err.toString()); 
        } else {
            result_callback(results);
        }
    });
} 

function get_password(user_name, label, result_callback) { 
    get_information(user_name, label, (result) => {
        if(typeof(result) === "string") { 
            result_callback("Error: " + result); 
            return;
        }
        let result_message = "";
        if(result.length != 0) {
            let data = result[0];
            result_message = `Login: ${data.login}   Password: ${data.password}`;
        } else {
            result_message = `There with no password with label ${label} for user ${user_name}`;
        }
        result_callback(result_message);
    });
}

function update_password(user_name, label, new_login, new_password, result_callback) { 
    get_information(user_name, label, (result) => {
        if(typeof(result) === "string") { 
            result_callback("Error: " + result); 
            return;
        }
        if(result.length != 0) {
            let data = result[0];
            let updated_login = data.login; 
            let updated_password = data.password; 
            if(new_login.length > 0) {
                updated_login = new_login;
            } 
            if(new_password.length > 0) {
                updated_password = new_password;
            }
            if(updated_login != data.login || updated_password != data.password) {
                let sql_command = ` UPDATE ${table_name} SET login = '${updated_login}', password = '${updated_password}'
                WHERE ( user_id = '${user_name}' AND description = '${label}' ); `;
                database_connection.query(sql_command, (err, result) => { 
                    let result_message = "";
                    if(err) { 
                        result_message = "Error: " + err.toString();
                    } else { 
                        result_message = "Sucessfully updated password";
                    }
                    result_callback(result_message);
                });
            } else { 
                result_callback("New Login/password combination matches exisiting combination");
            }
        } else {
            result_callback(`There with no password with label ${label} for user ${user_name}`);
        }
    });
}

function remove_password(user_name, label, result_callback) { 
    get_information(user_name, label, (result) => {
        if(typeof(result) === "string") { 
            result_callback("Error: " + result); 
            return;
        }
        if(result.length != 0) {
            let delete_sql = `DELETE FROM ${table_name} WHERE ( user_id = '${user_name}' AND description = '${label}' ); `;
            database_connection.query(delete_sql, (err, result) => {
                if(err) {
                    result_callback("Error: " + err.toString());
                } else { 
                    result_callback("Password removed sucessfully");
                }
            });
        } else {
            result_callback(`There with no password with label ${label} for user ${user_name}`);
        }
    });
}

function add_password(user_name, label, login_info, password, result_callback) { 
    get_information(user_name, label, (result) => {
        if(typeof(result) === "string") { 
            result_callback("Error: " + result); 
            return;
        }
        if(result.length === 0) {
            let sql_command = `INSERT INTO ${table_name} (user_id, description, login, password) VALUES ('${user_name}', '${label}', '${login_info}', '${password}');`;
            database_connection.query(sql_command, (err, result) => {
                let result_message = "";
                if(err) { 
                    result_message = "Error: " + err.toString();
                } else { 
                    result_message = "Sucessfully saved new password";
                }
                result_callback(result_message);
            });
        } else {
            result_callback("This login/password combination already exists");
        }
    });
}

module.exports = { get_password, add_password, remove_password, update_password };