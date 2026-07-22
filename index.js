let myLeads = []
let inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputbtn = document.getElementById("input-btn")
const deletebtn = document.getElementById("delete-btn")
const LeadsfromLocalstorage = JSON.parse(localStorage.getItem("myLeads"))
const saveEl = document.getElementById("save-btn")    
    if(LeadsfromLocalstorage){
        myLeads = LeadsfromLocalstorage
        console.log(myLeads)
        render(myLeads)
    }
    saveEl.addEventListener('click',function(){
        chrome.tabs.query({active:true , currentWindow: true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
        })
    })

    deletebtn.addEventListener('dblclick',function(){
        localStorage.clear()
        myLeads = []
        render(myLeads)
    })
inputbtn.addEventListener("click", function (){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads){
    let inputitem = ""
    for(let i=0;i<leads.length;i++){
        inputitem += `<li>
        <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
        </a>
        </li>`
    }
    ulEl.innerHTML= inputitem
}
