function filterUsers(event) {
  // get the event tag value and convert to uppercase
  let filter = event.target.value.toUpperCase();
  // get the users tags
  let userRows = document.getElementsByClassName('user-data-tr');
  
  for (const userRow of userRows) {
    // get user names from the rows
    let firstName = userRow.getElementsByClassName('first-name')[0];
    let lastName = userRow.getElementsByClassName('last-name')[0];
    let email = userRow.getElementsByClassName('email')[0];
    // hide the non matching first or last name
    if (
      (firstName && firstName.innerHTML.toUpperCase().indexOf(filter) > -1) ||
      (lastName && lastName.innerHTML.toUpperCase().indexOf(filter) > -1) ||
      (email && email.innerHTML.toUpperCase().indexOf(filter) > -1)
    ) {
      userRow.style.display = '';
    } else {
      userRow.style.display = 'none';
    }
  }
}
