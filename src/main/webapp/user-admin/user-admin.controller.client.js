var $usernameFld
var $firstNameFld
var $lastNameFld
var $passwordFld
var $roleFld
var $createBtn
var theTableBody
var $updateBtn
var courseService = new CourseServiceClient()

function addCourse() {
  createUser({
    username: 'NEW COURSE',
    password: 100,
    firstName: 'Fall',
    lastName: 'wer',
    role: 'we'
  })
}
var users = [];

function createUser(user) {
  courseService.createCourse(user)
  .then(function (actualUser) {
    users.push(actualUser)
    renderCourses(users)
  })
}

var selectedUser = null
function selectUser(event) {
  var selectBtn = jQuery(event.target)
  var theId = selectBtn.attr("id")
  selectedUser = users.find(user => user._id === theId)
  $usernameFld.val(selectedUser.username)
  $passwordFld.val(selectedUser.password)
  $firstNameFld.val(selectedUser.firstName)
  $lastNameFld.val(selectedUser.lastName)
  $roleFld.val(selectedUser.role)
}

function deleteCourse(event) {
  console.log(event.target)
  var deleteBtn = jQuery(event.target)
  var theClass = deleteBtn.attr("class")
  var theIndex = deleteBtn.attr("id")
  var theId = users[theIndex]._id
  console.log(theClass)
  console.log(theIndex)

  courseService.deleteCourse(theId)
  .then(function (status) {
    users.splice(theIndex, 1)
    renderCourses(users)
  })
}

function renderCourses(users) {
  theTableBody.empty()
  for (var i = 0; i < users.length; i++) {
    var user = users[i]
    theTableBody
    .append(`
    <tr>
        <td>${user.username}</td>
        <td >****</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.role}</td>
        <td class="wbdv-actions">
          <span class="pull-right">
            <i class="fa fa-2x fa-times wbdv-delete" id="${i}"></i>
            <i class="fa-2x fa fa-pencil wbdv-select" id="${user._id}"></i>
          </span>
        </td>
    </tr>
  `)
  }
  jQuery(".wbdv-delete")
  .click(deleteCourse)
  jQuery(".wbdv-select")
  .click(selectUser)
}
// renderCourses(courses)

function updateUser() {
  console.log(selectedUser)
  selectedUser.username = $usernameFld.val()
  selectedUser.password = $passwordFld.val()
  selectedUser.firstName = $firstNameFld.val()
  selectedUser.lastName = $lastNameFld.val()
  selectedUser.role = $roleFld.val()
  courseService.updateCourse(selectedUser._id, selectedUser)
  .then(function (status) {
    var index = users.findIndex(user => user._id === selectedUser._id)
    users[index] = selectedUser
    renderCourses(users)
  })
  $usernameFld.val("")
  $passwordFld.val("")
  $firstNameFld.val("")
  $lastNameFld.val("")
  $roleFld.val("Faculty")
}

function init() {
  $usernameFld = $(".wbdv-username-fld")
  $passwordFld = $(".wbdv-password-fld")
  $firstNameFld = $(".wbdv-first-name-fld")
  $lastNameFld = $(".wbdv-last-name-fld")
  $roleFld = $(".wbdv-role-fld")
  $createBtn = $(".wbdv-create-btn")
  $updateBtn = $(".wbdv-update-btn")
  theTableBody = jQuery("#table-rows")

  $updateBtn.click(updateUser)
  $createBtn.click(() => {
    createUser({
      username: $usernameFld.val(),
      password: $passwordFld.val(),
      firstName: $firstNameFld.val(),
      lastName: $lastNameFld.val(),
      role: $roleFld.val()
    })
    $usernameFld.val("")
    $passwordFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
    $roleFld.val("Faculty")
  })



  courseService.findAllCourses()
  .then(function (actualCoursesFromServer) {
    users = actualCoursesFromServer
    renderCourses(users)
  })
}
jQuery(init)

