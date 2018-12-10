const { Client } = require('pg');
const configDB = require('./configDB');

class Database {

  static async query(sqlQuery) {
    try {
      const client = new Client(configDB);
      console.log(sqlQuery);
      return new Promise((resolve, reject) => {
          client.connect();
          client.query(sqlQuery, (err, res) => {
              if (err) {
                  console.error(err);
                  reject(err);
              }
              client.end();
              if (res) {
                resolve(res.rows);
              }
          });
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static parseToInsert(entity) {
    let columns = '';
    let values = '';

    Object.keys(entity).forEach((field) => {
        if (columns !== '') {
          columns += ', ';
          values += ', ';
        }
        columns += field;
      if (entity[field] != undefined) {
        values += isNaN(entity[field]) ? `'${entity[field].trim()}'` : entity[field];
      } else {
        values += null;
      }
    });

    columns = '(' + columns + ')';
    values = '(' + values + ')';

    return { columns, values };
  }

  static parseToEdit(entity) {
    let values = '';

    Object.keys(entity).forEach((field) => {
      if (values !== '') {
        values += ', ';
      }
      if ((isNaN(entity[field]) && entity[field]) || !isNaN(entity[field])) {
        values += `${field} = ${isNaN(entity[field]) ? `'${entity[field]}'` : entity[field]}`;
      }
    });

    return { values };
  }
}
  
module.exports = Database;
  