'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Publicacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      condiciones: {
        type: Sequelize.STRING
      },
      contrato: {
        type: Sequelize.STRING
      },
      inmobiliaria: {
        type: Sequelize.STRING
      },
      ivigencia: {
        type: Sequelize.DATE
      },
      fvigencia: {
        type: Sequelize.DATE
      },
      portada: {
        type: Sequelize.STRING
      },
      filename1: {
        type: Sequelize.STRING
      },
      filename2: {
        type: Sequelize.STRING
      },
      filename3: {
        type: Sequelize.STRING
      },
      filename4: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL
      },
      longitude: {
        type: Sequelize.DECIMAL
      },
      precio: {
        type: Sequelize.DECIMAL
      },
      pago: {
        type: Sequelize.STRING
      },
      caracteristicas: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      tipo: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.INTEGER
      },
      views: {
        type: Sequelize.INTEGER
      },
      categoriaId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Categoria',
            key: 'id',
            as: 'categoriaId'
        }
      },
      clienteId: {
        type: Sequelize.INTEGER,
          references: {
            model: 'Clientes',
            key: 'id',
            as: 'clienteId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Publicacions');
  }
};