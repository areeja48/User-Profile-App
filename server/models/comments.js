module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("comments", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    });
  
    return Comments;
  };