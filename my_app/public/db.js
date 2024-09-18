// db.js
const dbName = "formDatabase";
const dbVersion = 1;
const storeName = "forms";

let db;

// Abrir ou criar o banco de dados
const request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("customerName", "customerName", { unique: false });
    objectStore.createIndex("carBrand", "carBrand", { unique: false });
    objectStore.createIndex("carModel", "carModel", { unique: false });
    objectStore.createIndex("carYear", "carYear", { unique: false });
    objectStore.createIndex("carColor", "carColor", { unique: false });
    objectStore.createIndex("formDate", "formDate", { unique: false });
    objectStore.createIndex("programmingDate", "programmingDate", { unique: false });
    objectStore.createIndex("serviceType", "serviceType", { unique: false });
};

request.onsuccess = (event) => {
    db = event.target.result;
};

request.onerror = (event) => {
    console.error("Erro ao abrir o banco de dados:", event.target.errorCode);
};

// Função global para adicionar um formulário ao IndexedDB
window.addForm = function(data) {
    if (!db) {
        console.error("Banco de dados ainda não carregado.");
        return;
    }

    const transaction = db.transaction([storeName], "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.add(data);

    request.onsuccess = () => {
        console.log("Formulário adicionado com sucesso.");
    };

    request.onerror = (event) => {
        console.error("Erro ao adicionar o formulário:", event.target.errorCode);
    };
};

// Função global para obter todos os formulários do IndexedDB
window.getAllForms = function(callback) {
    if (!db) {
        console.error("Banco de dados ainda não carregado.");
        return;
    }

    const transaction = db.transaction([storeName], "readonly");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();

    request.onsuccess = () => {
        callback(request.result);
    };

    request.onerror = (event) => {
        console.error("Erro ao recuperar os formulários:", event.target.errorCode);
    };
};
