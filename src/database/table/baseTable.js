let conn = require('../conn');

/**
 * 通用数据表
 */
function BaseTable(name, keys) {
  this.name = name;
  this.keys = keys;
}

BaseTable.prototype.create = function () {
  let create = `create table if not exists ${this.name} (
    id int(11) not null auto_increment, `;
  for(let i = 0; i < this.keys.length; i++)
    create += this.keys[i] + ' varchar(200), ';
  create += 'primary key (id)) ';
  create += 'ENGINE=InnoDB DEFAULT CHARSET=utf8';
  console.log(create);
  return new Promise((resolve, reject) => {
    conn.query(create, (err, res) => {
      if(err) reject(err);
      else resolve(res);
    })
  })
};

/*  插入一个或多个数据
 参数为表字段对应的值：数组
 */
BaseTable.prototype.insert = function (records) {

  // 遍历键
  let insertSQL = `insert into ${this.name} (`;
  this.keys.forEach((key) => {
    insertSQL += `${key},`;
  });
  insertSQL = insertSQL.substring(0, insertSQL.length - 1) + ')values ';

  //遍历值, 先遍历每条记录，再遍历记录中的每个值
  records.forEach((record) => {
    insertSQL += '(';
    for(let key in record) insertSQL += `'${record[key]}',`;
    insertSQL = insertSQL.substring(0, insertSQL.length - 1) + '),';
  });

  insertSQL = insertSQL.substring(0, insertSQL.length - 1) + ';';
  console.log(insertSQL);
  return new Promise((resolve, reject) => {
    conn.query(insertSQL, (err, res) => {
      if(err) reject(err);
      else resolve(res);
    })
  })
};

module.exports = BaseTable;