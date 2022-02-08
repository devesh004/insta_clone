// const search_user_element = document.querySelector(".search-user");
// const user_list_element = document.querySelector(".user-list");
// const input = document.querySelector(".input");
// const close_list_btn = document.querySelector(".close");

// let module = require("../../app.js");
// let Userlist = module.Userlist;
// console.log(Userlist);

// function createUserList() {
//   Userlist.forEach((user) => {
//     // user_list_element.innerHTML += `<ul id='${list}'></ul>`;
//     document.getElementById(`${list}`).innerHTML += `
//             <li onclick="fetchData('${user.username}')" id="${user.id}">
//             ${user.username}
//             </li>
//         `;
//     user_list_element.innerHTML += `<ul id='${list}'></ul>`;
//   });
// }

// createUserList();

// // chang_country_btn.addEventListener("click", function () {
// //     input.value = "";
// //     resetUserList();
// //     search_country_element.classList.toggle("hide");
// //     search_country_element.classList.add("fadeIn");
// // });

// input.addEventListener("input", function () {
//   let value = input.value.toUpperCase();
//   Userlist.forEach((user) => {
//     if (user.username.toUpperCase().startsWith(value)) {
//       document.getElementById(user.id).classList.remove("hide");
//     } else {
//       document.getElementById(user.id).classList.add("hide");
//     }
//   });
// });

// close_list_btn.addEventListener("click", () => {
//   search_user_element.classList.toggle("hide");
// });

// user_list_element.addEventListener("click", function () {
//   search_user_element.classList.toggle("hide");
// });
