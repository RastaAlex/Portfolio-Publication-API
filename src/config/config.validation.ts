import * as Joi from 'joi';

export function validate(config: any) {
  const schema = Joi.object({
    app: Joi.object({
      port: Joi.number().integer().min(1).max(65535).required(),
    }),
    typeorm: Joi.object({
      connection: Joi.string().valid('postgres').required(),
      host: Joi.string().required(),
      port: Joi.number().integer().min(1).max(65535).required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      database: Joi.string().required(),
      synchronize: Joi.boolean().required(),
      logging: Joi.boolean().required(),
      entities: Joi.string().required(),
    }),
  });

  return schema.validate(config, { allowUnknown: true, abortEarly: false });
}
