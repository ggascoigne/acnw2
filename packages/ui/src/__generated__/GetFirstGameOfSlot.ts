/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFirstGameOfSlot
// ====================================================

export interface GetFirstGameOfSlot_games_nodes_gameAssignments_nodes_member_user_profile {
  __typename: 'Profile'
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: string
  id: number
  email: string
  fullName: string
  phoneNumber: string | null
  snailMailAddress: string | null
}

export interface GetFirstGameOfSlot_games_nodes_gameAssignments_nodes_member_user {
  __typename: 'User'
  /**
   * Reads a single `Profile` that is related to this `User`.
   */
  profile: GetFirstGameOfSlot_games_nodes_gameAssignments_nodes_member_user_profile | null
}

export interface GetFirstGameOfSlot_games_nodes_gameAssignments_nodes_member {
  __typename: 'Membership'
  /**
   * Reads a single `User` that is related to this `Membership`.
   */
  user: GetFirstGameOfSlot_games_nodes_gameAssignments_nodes_member_user | null
}

export interface GetFirstGameOfSlot_games_nodes_gameAssignments_nodes {
  __typename: 'GameAssignment'
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: string
  gm: number
  /**
   * Reads a single `Membership` that is related to this `GameAssignment`.
   */
  member: GetFirstGameOfSlot_games_nodes_gameAssignments_nodes_member | null
}

export interface GetFirstGameOfSlot_games_nodes_gameAssignments {
  __typename: 'GameAssignmentsConnection'
  /**
   * A list of `GameAssignment` objects.
   */
  nodes: (GetFirstGameOfSlot_games_nodes_gameAssignments_nodes | null)[]
}

export interface GetFirstGameOfSlot_games_nodes {
  __typename: 'Game'
  /**
   * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
   */
  nodeId: string
  id: number
  name: string
  gmNames: string | null
  description: string
  genre: string
  type: string
  setting: string
  charInstructions: string
  playerMax: number
  playerMin: number
  playerPreference: string
  returningPlayers: string
  playersContactGm: boolean
  gameContactEmail: string
  estimatedLength: string
  slotPreference: number
  lateStart: string | null
  lateFinish: boolean | null
  slotConflicts: string
  message: string
  slotId: number | null
  teenFriendly: boolean
  year: number
  /**
   * Reads and enables pagination through a set of `GameAssignment`.
   */
  gameAssignments: GetFirstGameOfSlot_games_nodes_gameAssignments
}

export interface GetFirstGameOfSlot_games {
  __typename: 'GamesConnection'
  /**
   * A list of `Game` objects.
   */
  nodes: (GetFirstGameOfSlot_games_nodes | null)[]
}

export interface GetFirstGameOfSlot {
  /**
   * Reads and enables pagination through a set of `Game`.
   */
  games: GetFirstGameOfSlot_games | null
}

export interface GetFirstGameOfSlotVariables {
  year: number
}
