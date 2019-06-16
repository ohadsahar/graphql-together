module.exports = {
    production: {
    
      logger: {
        morganLevel: 'tiny',
        level: 'info',
      },
      cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      },
  
      neoDB: {
        username: 'neo4j',
        password: '',
        uri: 'bolt://localhost:7687',
      }
    },
    development: {
      neoDB: {
        username: 'neo4j',
        password: 'ppd53brx',
        uri: 'bolt://localhost:7687',
      },
      logger: {
        morganLevel: 'dev',
        level: 'debug',
      },
      cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      },
    },
    test: {
      neoDB: {
        username: 'neo4j',
        password: '',
        uri: 'bolt://localhost:7687',
      },
      logger: {
        morganLevel: 'dev',
        level: 'debug',
      },
    },
  };