var data=[]
var savedata=[]
async function getProducts()
{
    var res=await fetch("http://localhost:3000/products");
    data = await res.json();
    displayProducts(data);
    getSave();
}
async function getSave()
{
    var res=await fetch("http://localhost:3000/saveforLater");
    savedata = await res.json();
    getSaveForLater(savedata);
}
function displayProducts(data)
{
    for (i = 0; i < data.length; i++) {
        document.getElementById("products").innerHTML += `<div class="card text-white m-3 w-75 border border-dark align-items-center">
        <div class="card-body">
        <img src=${data[i].thumbnail} class="card-img-top" alt="Image">
        <p class="card-title h-100">${data[i].title}</p>
        <p class="card-text">${data[i].description}</p>
        <p class="card-text">Price-${data[i].price}</p>
        <p class="card-text">Rating-${data[i].rating}</p>
        <p class="card-text">Stock-${data[i].stock}</p>
        <p class="card-text">Category-${data[i].category}</p>
        <button type="button" id=${data[i].id} onclick="addSaveForLater(id)" class="btn btn-primary">Save for later</button>
        </div>
        </div>`;
      }
}
getProducts();

function getSaveForLater(savedata)
{
    for (i = 0; i < savedata.length; i++) {
        document.getElementById("saveforlater").innerHTML += `<div class="align-items-center"><div class="card w-75 text-white border border-dark align-items-center">
        <div class="card-body">
        <img src=${savedata[i].thumbnail} class="card-img-top" alt="Image">
        <p class="card-title h-100">${savedata[i].title}</p>
        <p class="card-text">${savedata[i].description}</p>
        <p class="card-text">Price-${savedata[i].price}</p>
        <p class="card-text">Rating-${savedata[i].rating}</p>
        <p class="card-text">Stock-${savedata[i].stock}</p>
        <p class="card-text">Category-${savedata[i].category}</p>
        </div>
        </div>
        </div>`
    }

}
async function addSaveForLater(id)
{
    const reponseproduct = await fetch("http://localhost:3000/products/"+id);
    const result =await reponseproduct.json(); 
    const count= savedata.filter(x=>x.title==result.title)
      if(count==0)
      {
      const response = await fetch("http://localhost:3000/saveforLater", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thumbnail:result.thumbnail,
          title: result.title,
          description:result.description,
          price:result.price,
          rating:result.rating,
          stock:result.stock,
          category:result.category
        }),
      });
      
    }
    else{
        alert("Product already exist in save for later.");
    }
    savedata = await response.json();
    getSaveForLater(savedata);
      
}

