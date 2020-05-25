import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../common/config/databaseConfig';
import { IDatabaseConfigAttributes } from '../common/config/interfaces/IDatabase';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config: IDatabaseConfigAttributes;

      switch (process.env.NODE_ENV) {
        case 'production':
          config = databaseConfig.production;
          break;
        case 'develop':
          config = databaseConfig.develop;
          break;
        default:
          config = databaseConfig.develop;
      }

      const sequelize = new Sequelize({
        ...config,
        modelPaths: [__dirname + '/../**/*.model.js'],
        modelMatch: (filename, member) => {
          return (
            filename.substring(0, filename.indexOf('.model')) ===
            member.toLowerCase()
          );
        },
        define: {
          timestamps: false,
          version: true,
        },
      });

      /**
       * Attention! If force = true, then all data in DB will be destroyed.
       * All tables will be recreated again.
       */
      const force: boolean = false;

      await sequelize.sync({ force });
      return sequelize;
    },
  },
];
