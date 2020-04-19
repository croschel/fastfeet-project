
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: null,
    },
    recipient_id: {
      type: Sequelize.INTEGER,
      references: { model: 'recipients', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    },
    transporter_id: {
      type: Sequelize.INTEGER,
      references: { model: 'transporters', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    },
    signature_id: {
      type: Sequelize.INTEGER,
      references: { model: 'signatures', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    },
    product: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    canceled_at: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    start_date: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    end_date: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('orders'),
};
