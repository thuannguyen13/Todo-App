// var api = 'https://reqres.in/api/users';

// var btn,
//     txtArea;

// btn     = document.querySelector("#test")
// txtArea = document.querySelector("#txtArea")

// function triggerAlert(){
//     console.log(btn)
//     var users;
//     var values = []
//     users = fetch(api)
//             .then(res => res.json())
//             .then(data => {
//                 for (const iDs in data.data ) {
//                     values.push(data.data[iDs].email)
//                 };
//                 txtArea.value = values.join("\r\n")
//                 console.log(values)
//             });
// };