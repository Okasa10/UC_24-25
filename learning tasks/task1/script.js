
//CRUD OPeration buttons box
const buttonBox = document.getElementById('buttonBox');

//CRUD OPeration buttons
const get = document.getElementById('get')
const put = document.getElementById('put')
const post = document.getElementById('post')
const del = document.getElementById('delete')
let productData;
let currentPage = 1;


const page = document.getElementById('page');

// printing all the products
const printData = (productData, element, no, length) => {
    currentPage = no;
    element.innerHTML = "";
    for (let i = ((no - 1) * length); i < (no * length); i++) {
        if (i == productData.length) {
            break;
        }
        let productCard = document.createElement('div')

        element.append(productCard);
        productCard.innerHTML =
            `<div class="card" style="width: 18rem;">
        <img src="${productData[i].thumbnail}" class="card-img-top" alt="${productData[i].title}">
        <div class="card-body">
        <h5 class="card-title"><h4>${productData[i].title}</h4><br><br> Id: ${productData[i].id}<br><br> Price:${productData[i].price}$  </h5>
        <p class="card-text">${productData[i].description}<br><br>Stock:${productData[i].stock}</p>
        </div>
        </div>`
    }

}

//adding event listeners to page numbers
const click = (element, no) => {
    element.addEventListener('click', () => {

        let length = 12;
        if (no != 1)
            getcards.innerHTML = "";
        printData(productData, getcards, no, length);

    })
}

const paging = () => {
    const previous = page.querySelector('#previous');
    const p1 = page.querySelector('#p1');
    const p2 = page.querySelector('#p2');
    const p3 = page.querySelector('#p3');
    const next = page.querySelector('#next');
    // previous.disabled = true;

    previous.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            printData(productData, getcards, currentPage, 12);
        }
    })
    click(p1, 1);
    click(p2, 2);
    click(p3, 3);
    // click(p4, 4);
    // click(p5, 5);

    next.addEventListener('click', () => {
        if (currentPage < Math.round(productData.length / 12)) {
            currentPage++;
            printData(productData, getcards, currentPage, 12);
        }
    })

}


/*********************************************** get   ***************************************************/
/***********************************************  *****************************************************/


const getBox = document.getElementById('getBox');
const getcards = document.getElementById('getcards')

// GETTING ALL THE POSTS
const loadData = async () => {
    return fetch('https://dummyjson.com/products')
        .then((res) => {
            return res.json()
        }).then((data) => {
            products = data;
            productData = products.products
        }).catch((err) => {
            alert('ERROR WHILE FETCHING PRODUCT DATA');
        })
}
loadData();
// immediately invoked so that it is accessible throughput the program


get.addEventListener('click', async (event) => {
    //adding style to each button
    get.style = ` color: black;
    background-color: whitesmoke;`
    //hiding other button styles
    put.style = ``
    post.style = ``
    del.style = ``

    //hide other things
    getID.style.display = "none";
    postForm.style.display = "none";
    deleteID.style.display = "none";

    getBox.style.display = "block";
    getcards.innerHTML = ""
    // displaying all the products
    printData(productData, getcards, 1, 12);
    paging();
    page.style.display = ""

})



/********************************************post   *****************************************************/
/***********************************************  *****************************************************/


const postcards = document.getElementById('postcards')
const postForm = document.getElementsByClassName('postForm')[0];
let name = document.getElementById('name')
let description = document.getElementById('description')
let price = document.getElementById('price')
let stock = document.getElementById('stock')
let imageLink = document.getElementById('image-link')



// POST REQUEST FUNCTION
const postData = async (obj) => {
    await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
        .then(res => { return res.json() })
        .then((value) => {
            alert('Product posted successfully');

            //displaying all the products  card 
            productData.push(value);

        })
        .catch((err) => {
            alert("Error occured while posting data")
        });
}


//POST REQUEST 
post.addEventListener('click', () => {
    //adding style to each button
    post.style = ` color: black;
     background-color: whitesmoke;`
    //hiding other button styles
    put.style = ``
    get.style = ``
    del.style = ``

    //hide other things
    deleteID.style.display = "none"
    getBox.style.display = "none";
    getID.style.display = "none";
    page.style.display = "none"

    // displayng the form
    postForm.style.display = "block";
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        //getting values from the post form
        let n = name.value
        let d = description.value
        let p = price.value
        let s = stock.value
        let il = imageLink.value
        if ((n) && (d) && (p) && (s) && (il)) {
            const details = {
                "title": `${n}`,
                "price": `${p}`,
                "description": `${d}`,
                "stock": `${s}`,
                "thumbnail": `${il}`,
            };
            await postData(details);
        }
        else {
            alert("Enter all the specified fields to create a product")

        }
    })

})


/***********************************************UPDATE  *****************************************************/
/*********************************************** *****************************************************/

const getID = document.getElementById('getID');
const getIDbtn = document.getElementById('button-addon2');
let putForm = postForm.cloneNode(true);


// update request function
const updateData = async (id, obj) => {
    await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
        .then(res => {
            return res.json()
        })
        .then((value) => {
            alert('Information updated successfully');
            // updating the product
            productData[id - 1] = value;

            //displaying all the cards  with  the updated product

        }).catch((err) => {
            alert('Error occured while posting data');
        })
}


put.addEventListener('click', async () => {

    //adding style to each button
    put.style = ` color: black;
 background-color: whitesmoke;`
    //hiding other button styles
    get.style = ``
    post.style = ``
    del.style = ``
    //HIDING EVERYTHING NOT NEEDED
    postForm.style.display = "none";
    deleteID.style.display = "none"
    getBox.style.display = "none";
    page.style.display = "none"



    //GETTING THE ID OF THE PRODUCT 
    let id;
    getID.style.display = "flex";

    getIDbtn.addEventListener('click', async () => {
        const ID = getID.querySelector('#putId');
        id = ID.value;

        //Finding if the product with entered id even exists 
        const current = await function (productData) {
            for (item in productData) {
                if (productData[item].id == Number(id))
                    return productData[item];
            }
        }(productData);
        if (!current) {
            alert("Product not Found");
        }
        else {

            //getting put form elements  since it was cloned
            let putname = putForm.querySelector('#name');
            let putdescription = putForm.querySelector('#description');
            let putprice = putForm.querySelector('#price');
            let putstock = putForm.querySelector('#stock');
            let putimageLink = putForm.querySelector('#image-link');

            // setting values according to the entered id
            putname.value = current.title;
            putdescription.value = current.description;
            putprice.value = current.price;
            putstock.value = current.stock;
            putimageLink.value = current.thumbnail;
            getID.append(putForm);


            putForm.style.display = "block";


            putForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const details = {
                    "title": `${putname.value}`,
                    "price": `${putprice.value}`,
                    "description": `${putdescription.value}`,
                    "stock": `${putstock.value}`,
                    "thumbnail": `${putimageLink.value}`,
                }
                updateData(id, details);

            })


        }

    })
})


/***********************************************DELETE  **************************************/
/************************************** *****************************************************/
const deleteID = getID.cloneNode(true);
const deleteIDbtn = deleteID.querySelector('#button-addon2');


// buttonBox.append(deleteID);
buttonBox.insertAdjacentElement('afterend', deleteID)


const deleteProduct = async (id) => {

    return await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then((value) => {
            alert("The product has been deleted");
            productData.splice(id - 1, 1)

        })
        .catch((err) => alert('Error occured while deleting product'))
}


del.addEventListener('click', async () => {
    //adding style to each button
    del.style = ` color: black;
     background-color: whitesmoke;`
    //hiding other button styles
    put.style = ``
    post.style = ``
    get.style = ``

    // hiding other things
    postForm.style.display = "none";
    putForm.style.display = "none";
    getBox.style.display = "none";
    getID.style.display = "none";
    page.style.display = "none"


    let id;
    deleteID.style.display = "";

    deleteIDbtn.addEventListener('click', async () => {
        deleteIDbtn.disabled = true;
        const delId = deleteID.querySelector('#putId')
        id = delId.value;

        //Finding if the product is even exists 
        const current = await function (productData) {
            for (item in productData) {
                if (productData[item].id == id)
                    return productData[item];
            }
        }(productData);

        if (!current) {
            alert("Product not Found");
        }
        else {
            if (confirm("Do you want delete this product")) {
                await deleteProduct(id);
            }

        }
    })
})

