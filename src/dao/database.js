class Database {

  static async query(sqlQuery) {
    const result = { };
    console.log(sqlQuery);
    return result;
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
      values += isNaN(entity[field]) ? `'${entity[field]}'` : entity[field];
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
      values += `${field} = ${isNaN(entity[field]) ? `'${entity[field]}'` : entity[field]}`;
    });

    return { values };
  }
}
  
module.exports = Database;
  