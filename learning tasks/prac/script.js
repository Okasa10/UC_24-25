document.getElementById("getRequest").addEventListener("click", getRequest);
let x;
let output = document.getElementById("output");
function getRequest() {
    fetch('https://dummyjson.com/posts') // returns a resolved promise ,value is the data we want 
        .then(res => res.json()) //returns a resolved promise whose value is the data in the json format
        .then((data) => {
            x = data.posts;
            x.forEach((user) => {
                output.innerHTML += `
       <ul class="list-group mb-3">
       <li class="list-group-item">ID: ${user.id}</li>
       <li class="list-group-item">Title: ${user.title}</li>
       </ul>
       `
            })

        })
}

document.getElementById("postRequest").addEventListener("click", postRequest);

function postRequest() {
    // document.getElementById("output").innerHTML = ""
    // let y = document.getElementById("output").innerHTML;
    // document.getElementById("output").innerHTML = "";
    const title = document.getElementById("title").value;
    const id = document.getElementById("body").value;
    fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": `${title}`,
            "userId": `${id}`
        })
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            // my data which is posted is stored in output string
            let newPRoduct =
                `
        <ul class="list-group mb-3">
        <li class="list-group-item">ID: ${data.userId}</li>
        <li class="list-group-item">Title: ${data.title}</li>
        </ul>
        `
            // document.getElementById("output").append(newPRoduct);
            document.getElementById("output").innerHTML += newPRoduct;
        });
}


// document.getElementById("deleteRequest").addEventListener("click", deleteRequest);

// function deleteRequest() {
//     let body = prompt("Which ID do you want to delete?");
//     fetch(`https://dummyjson.com/posts/${body}`, {
//         method: 'DELETE',
//     })
//         .then(res => res.json())   // Deletedata contains the object which is deleted
//         .then((Deletedata) => {

//             fetch('https://dummyjson.com/posts')
//                 .then(res => res.json())
//                 .then((data) => {
//                     let x = data.posts;
//                     x.forEach((user) => {

//                         // GENERATION OF STRING WITH DELETED VALUE
//                         if (user.id != Deletedata.id) {
//                             deletedOutput += `
//           <ul class="list-group mb-3">
//           <li class="list-group-item">ID: ${user.id}</li>
//           <li class="list-group-item">Title: ${user.title}</li>
//           </ul>
//           `
//                         }
//                     })
//                     document.getElementById("output").innerHTML = y + "" + output;
//                 });
//         })
// }