module.exports = (sequelize, dataTypes) => {
  let alias = 'Sessions';
  let cols = {
    sid: {
      type: dataTypes.CHAR(36),
      primaryKey: true
    },
    expires: {
      type: dataTypes.DATE
    },
    data: {
      type: dataTypes.TEXT
    }
  };
  let config = {
    tableName: 'Sessions',
    timestamps: true,
  };
  const Sessions = sequelize.define(alias, cols, config)
  return Sessions
}
