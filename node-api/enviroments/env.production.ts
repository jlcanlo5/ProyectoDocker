export default {
    API: {
        NAME: 'microservicio Punto de venta | NodeJS',
        PORT: 5000,
        ENVIRONMENT: 'Development'
    },
    NOTIFY: {
        DELAY: 1000 * 10        // 10 Segundos
    },
    TOKEN: {
        SECRETKEY: 'secretkey',
        EXPIRES: 5000    // 4 Horas
    },
    MONGODB: {
        HOST: '192.168.153.134',
        PORT: 39018,
        USER_NAME: 'dba-operador',
        USER_PASSWORD: 'operador123',
        DEFAULT_DATABASE: 'dbMTWDM'
    }
};