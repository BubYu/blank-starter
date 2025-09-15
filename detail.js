function get(id){ return document.getElementById(id); }
function show(el){ el?.classList.remove('hidden'); }
function hide(el){ el?.classList.add('hidden'); }

try{
  const raw = localStorage.getItem("companyData");
  if(raw){
    const parsed = JSON.parse(raw);
    if(Array.isArray(parsed)) window.companyData = parsed;
  }
}catch(e){ console.warn("LocalStorage parse error:", e); }

// Query params
const params = new URLSearchParams(location.search);
const idParam = params.get("id");
const isAdd = params.get("add")==="true";
let idx = Number.isFinite(+idParam) ? +idParam : null;

const viewMode = get("viewMode");
const editMode = get("editMode");
const addMode  = get("addMode");

function switchTo(mode){
  [viewMode, editMode, addMode].forEach(hide);
  if(mode==="view") show(viewMode);
  if(mode==="edit") show(editMode);
  if(mode==="add")  show(addMode);
}

if(isAdd){
  switchTo("add");
}else if(idx!=null && companyData && companyData[idx]){             
  const item = companyData[idx];
  renderView(item);
  prefillEdit(item);
  switchTo("view");

  get("editBtn").addEventListener("click", () => switchTo("edit"));
  get("cancelEdit").addEventListener("click", () => switchTo("view"));

  // Delete 

  get("deleteBtn")?.addEventListener("click", () => {
  if (confirm("Delete this company?")) {
    companyData.splice(idx, 1);
    localStorage.setItem("companyData", JSON.stringify(companyData));
    location.href = "index.html";
  }

});


  get("saveEdit").addEventListener("click", () => {               
    item.company = get("editName").value.trim() || item.company;
    item.sector  = get("editSector").value.trim() || item.sector;
    item.city    = get("editCity").value.trim() || item.city;
    const f = parseInt(get("editFounded").value, 10);
    if(!Number.isNaN(f)) item.founded = f;
    const w = get("editWebsite").value.trim();
    if(w) item.website = w;

    localStorage.setItem("companyData", JSON.stringify(companyData));
    renderView(item);
    prefillEdit(item);
    switchTo("view");
  });
}else{
  switchTo("add");                                                 
}

// Add 
get("cancelAdd")?.addEventListener("click", () => history.back());
get("saveAdd")?.addEventListener("click", () => {                   
  const item = {
    company: get("createName").value.trim() || "Untitled Company",
    sector:  get("createSector").value.trim() || "Unknown",
    city:    get("createCity").value.trim() || "Unknown",
    founded: parseInt(get("createFounded").value, 10) || new Date().getFullYear(),
    website: get("createWebsite").value.trim() || ""
  };
  if(!Array.isArray(companyData)) window.companyData = [];
  companyData.push(item);
  localStorage.setItem("companyData", JSON.stringify(companyData));
  location.href = "detail.html?id=" + (companyData.length - 1);
});

// helpers
function renderView(item){
  get("viewTitle").textContent   = item.company;
  get("viewSector").textContent  = item.sector || "";
  get("viewCity").textContent    = item.city || "";
  get("viewFounded").textContent = item.founded || "";
  const hasWeb = !!item.website;
  if(hasWeb){
    get("viewWebsiteRow").classList.remove("hidden");
    const a = get("viewWebsite"); a.href = item.website; a.textContent = item.website;
  }else{
    get("viewWebsiteRow").classList.add("hidden");
  }
}
function prefillEdit(item){
  get("editName").value    = item.company || "";
  get("editSector").value  = item.sector || "";
  get("editCity").value    = item.city || "";
  get("editFounded").value = item.founded || "";
  get("editWebsite").value = item.website || "";
}
