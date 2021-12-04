









import  axios from 'axios'


let myitemclass = document.querySelectorAll('.myitem') //  this query selector all will give the array all results
let showItem = document.querySelector('.show-my-item')



function update(items){
    console.log(items)
    axios.post('/showitem',items).then(res =>{ 
        showItem.innerText = res.data
    }).catch(err =>{
        console.log(err)
    })
}










myitemclass.forEach((btn)=>{                   // we gave the name btn to the element of the array
    btn.addEventListener('click',(e)=>{
 // this is getting from home.ejs data-(ourname) ie. data-items 
        let items = btn.dataset.items       // It will convert the json string format to object  
        update(items)                               // made a funciton and sending our object to it
        // console.log(items) 

    })
})
