'use strict';
const studentCollection = require('../models/students');

/**
 * Get users endpoint that returns information regarding all the users
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getUserDetails = async (request, response, next) => {
  try {
    console.debug('Index incoming request...');
    console.debug('Getting notes from DB...');
    const users = await studentCollection.find({});
    console.debug('Notes found in DB: ' + users);
    response.render('student/list', {
      pageTitle: 'User lists',
      userList: users,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { getUserDetails };
