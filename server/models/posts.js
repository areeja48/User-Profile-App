module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt
    }
  );

  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
      onDelete: 'cascade',
    });
    Post.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
  };

  return Post;
};
