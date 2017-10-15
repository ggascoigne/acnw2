'use strict'

// drop a batch if stuff that I either don't care about or plan on handling
// differently this time around
//
// specifically the version, date_created and last_updated are hibernate traces,
// the dropped tables are application data rather than domain data and will just
// be handled a different way

exports.up = function (knex) {
  return knex
    .schema
    .raw('SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0')
    .raw('SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0')
    .dropTableIfExists('async_mail_attachment')
    .dropTableIfExists('async_mail_bcc')
    .dropTableIfExists('async_mail_cc')
    .dropTableIfExists('async_mail_header')
    .dropTableIfExists('async_mail_mess')
    .dropTableIfExists('async_mail_to')
    .dropTableIfExists('databasechangelog')
    .dropTableIfExists('databasechangeloglock')
    .dropTableIfExists('email_code')
    .table('game', function (table) {
      table.dropColumn('version')
      table.dropColumn('date_created')
      table.dropColumn('last_updated')
    })
    .table('game_assignment', function (table) {
      table.dropColumn('date_created')
      table.dropColumn('last_updated')
    })
    .table('game_choice', function (table) {
      table.dropColumn('version')
    })
    .table('game_submission', function (table) {
      table.dropColumn('version')
      table.dropColumn('date_created')
    })
    .table('hotel_room', function (table) {
      table.dropColumn('version')
    })
    .dropTableIfExists('login_record')
    .table('lookup', function (table) {
      table.dropColumn('version')
      table.dropColumn('date_created')
      table.dropColumn('last_updated')
    })
    .table('lookup_value', function (table) {
      table.dropColumn('version')
      table.dropColumn('date_created')
      table.dropColumn('last_updated')
    })
    .table('membership', function (table) {
      table.dropColumn('version')
      table.dropColumn('date_created')
      table.dropColumn('last_updated')
    })
    .table('profile', function (table) {
      table.dropColumn('version')
      table.dropColumn('date_created')
      table.dropColumn('last_updated')
    })
    .table('registration_code', function (table) {
      table.dropColumn('date_created')
    })
    .table('role', function (table) {
      table.dropColumn('version')
    })
    .table('room', function (table) {
      table.dropColumn('version')
    })
    .table('setting', function (table) {
      table.dropColumn('version')
      table.dropColumn('date_created')
      table.dropColumn('last_updated')
    })
    .table('shirt_order', function (table) {
      table.dropColumn('version')
    })
    .table('shirt_order_item', function (table) {
      table.dropColumn('version')
    })
    .table('slot', function (table) {
      table.dropColumn('version')
    })
    .table('user', function (table) {
      table.dropColumn('version')
      table.dropColumn('action_hash')
      table.dropColumn('date_created')
      table.dropColumn('last_updated')
    })
    .raw('SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS')
    .raw('SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS')
}

exports.down = function (knex) {
  // there's no rolling this back!
}
