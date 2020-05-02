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
        SECRET_KEY: 'secretkey-value',
        EXPIRES: '120s'    // 2 minutos 
    },
    MONGODB: {
        HOST: '192.168.153.134',
        PORT: 39018,
        USER_NAME: 'principal',
        USER_PASSWORD: 'hola123',
        DEFAULT_DATABASE: 'cars'
    }
};