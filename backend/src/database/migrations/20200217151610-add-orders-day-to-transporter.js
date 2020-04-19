module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('transporters', 'orders_day', {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
      defaultValue: 0,
    }),

  down: queryInterface =>
    queryInterface.removeColumn('transporters', 'orders_day'),
};
