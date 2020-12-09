const indexDb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let db; 
const request = indexDb.open("budget", 1);

request.onupgradeneeded = function(e) {
  const db = e.target.result;
  db.createObjectStore("transactions", { autoIncrement: true });
};

request.onerror = function(e) {
  console.log("There was an error");
};

request.onsuccess = function(e) {
    db = e.target.result;
    if (navigator.onLine){
        const transaction = db.transaction([
            "transactions"
    
        ],"readwrite")
        const store = transaction.objectStore("transactions")
        const getAll = store.getAll();
        getAll.onsuccess = function(){
            if (getAll.result.length >0 ){
                fetch("/api/transaction/bulk", {
                    method:"POST", body:JSON.stringify(all.result),
                    headers:{
                        Accept:"application/json, text/plain, */*",
                        "Content-Type": "application/json"              
                    }
                }).then(response => {
                    return response.json()
                }).then(()=> {
                    const transaction = db.transaction([
                        "transactions"
                
                    ],"readwrite")
                    const store = transaction.objectStore("transactions")
                    store.clear()
                })
            }
        }
    }
};

function saveRecord(record) {
    const transaction = db.transaction([
        "transactions"

    ],"readwrite")
    const store = transaction.objectStore("transactions")
    store.add(record)
}

window.addEventListener("online", ()=>{
    const transaction = db.transaction([
        "transactions"

    ],"readwrite")
    const store = transaction.objectStore("transactions")
    const getAll = store.getAll();
    getAll.onsuccess = function(){
        if (getAll.result.length >0 ){
            fetch("/api/transaction/bulk", {
                method:"POST", body:JSON.stringify(all.result),
                headers:{
                    Accept:"application/json, text/plain, */*",
                    "Content-Type": "application/json"              
                }
            }).then(response => {
                return response.json()
            }).then(()=> {
                const transaction = db.transaction([
                    "transactions"
            
                ],"readwrite")
                const store = transaction.objectStore("transactions")
                store.clear()
            })
        }
    }
})