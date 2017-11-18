import { Profile } from '../../models'
import { getErrorCode } from '../../utils/testUtils'

export async function getProfileHandler (req, reply) {
  const {id} = req.params

  try {
    const profile = await Profile.query()
      .findById(id)
      .throwIfNotFound()
    reply({
      profile,
      success: true,
      timestamp: Date.now()
    })
  } catch (error) {
    reply({
      success: false,
      error: error.name,
      message: error.message,
      timestamp: Date.now()
    }).code(getErrorCode(error))
  }
}

export async function getProfilesHandler (req, reply) {
  try {
    const profiles = await Profile.query()
    reply({
      profiles: profiles,
      success: true,
      timestamp: Date.now()
    })
  } catch (error) {
    reply({
      success: false,
      error: error.name,
      message: error.message,
      timestamp: Date.now()
    }).code(getErrorCode(error))
  }
}

export async function createProfileHandler (req, reply) {
  try {
    const profile = await Profile.query()
      .insert(req.payload)
    reply({
      success: true,
      profile,
      timestamp: Date.now()
    })
  } catch (error) {
    reply({
      success: false,
      error: error.name,
      message: error.message,
      timestamp: Date.now()
    }).code(getErrorCode(error))
  }
}

export async function patchProfileHandler (req, reply) {
  const {id} = req.params

  try {
    const profile = await Profile.query()
      .patchAndFetchById(id, req.payload)
      .throwIfNotFound()

    reply({
      success: true,
      profile,
      timestamp: Date.now()
    })
  } catch (error) {
    reply({
      success: false,
      error: error.name,
      message: error.message,
      timestamp: Date.now()
    }).code(getErrorCode(error))
  }
}

export async function putProfileHandler (req, reply) {
  const {id} = req.params

  try {
    const profile = await Profile.query()
      .updateAndFetchById(id, req.payload)
      .throwIfNotFound()

    reply({
      success: true,
      profile,
      timestamp: Date.now()
    })
  } catch (error) {
    reply({
      success: false,
      error: error.name,
      message: error.message,
      timestamp: Date.now()
    }).code(getErrorCode(error))
  }
}

export async function deleteProfileHandler (req, reply) {
  const {id} = req.params
  try {
    await Profile.query()
      .deleteById(id)
      .throwIfNotFound()

    reply({
      success: true,
      timestamp: Date.now()
    })
  } catch (error) {
    reply({
      success: false,
      error: error.name,
      message: error.message,
      timestamp: Date.now()
    }).code(getErrorCode(error))
  }
}