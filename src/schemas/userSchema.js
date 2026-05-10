export const userSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        uid: { type: 'string' },
        name: { type: 'string' }
      },
      required: ['uid', 'name']
    }
  },
  required: ['data']
};