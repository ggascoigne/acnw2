'use strict'

import Joi from 'joi'
import { Model } from '../orm'
import Profile from './profile'
import Role from './role'

export default class User extends Model {
  static get tableName () { return 'user' }

  static get relationMappings () {
    return {
      profile: {
        relation: Model.HasOneRelation,
        modelClass: Profile,
        join: {
          from: 'user.profile_id',
          to: 'profile.id'
        }
      },
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'user.id',
          through: {
            // user_role is the join table.
            from: 'user_role.user_id',
            to: 'user_role.role_id'
          },
          to: 'role.id'
        }
      }
    }
  }

  static async deleteAll () {
    return User
      .query()
      .delete()
      .catch(err => {
        console.error(err.stack)
      })
  }

  static get schema () {
    return {
      username: Joi.string().max(32),
      password: Joi.string().max(64).regex(/[a-zA-Z0-9@-_]{3,30}/),
      profile_id: Joi.number(),
      account_expired: Joi.boolean(),
      account_locked: Joi.boolean(),
      enabled: Joi.boolean(),
      password_expired: Joi.boolean()
    }
  }

  static get requiredSchema () {
    return Joi.object().keys(User.schema)
      .requiredKeys('username', 'password', 'profile_id')
  }
}
