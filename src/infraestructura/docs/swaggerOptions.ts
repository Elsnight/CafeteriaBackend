
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST Comedor EPN',
      version: '1.0.0',
      description: 'API REST que sirve los enpoint necesarios para el funcionamiento del comedor EPN'
    },
    servers: [
      {
        url: `https://app-cafeteriacackend.herokuapp.com/`
      }
    ]
  },
  apis: ['./src/infraestructura/routes/*.ts'],
}