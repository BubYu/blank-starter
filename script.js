// Buttons
document.getElementById("store")?.addEventListener("click", store);
document.getElementById("load")?.addEventListener("click", load);
document.getElementById("company")?.addEventListener("click", companyList);

let x = { age: 17, name: "Yuda" };

const DATA_KEY = "companyData";


function getLatestCompanyData() {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        companyData = parsed;
      }
    }
  } catch (e) {
    console.warn("companyData load error:", e);
  }
  return companyData; // return current array
}

function store() {
  localStorage.setItem("Yuda.store", JSON.stringify(x));
  console.log("Saved:", x);
  alert("Saved sample object to LocalStorage (key: Yuda.store).");
}
function load() {
  const got = JSON.parse(localStorage.getItem("Yuda.store") || "null");
  console.log("Loaded:", got);
  alert("Open the DevTools console to see the loaded object.");
}

// latest data
function companyList() {
  const data = getLatestCompanyData(); 

  const tbody = document.getElementById("companyBody");
  if (!tbody) return;

  tbody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.textContent = i + 1;

    const tdCompany = document.createElement("td");
    tdCompany.textContent = data[i].company;

    const tdSector = document.createElement("td");
    tdSector.textContent = data[i].sector;

    const tdCity = document.createElement("td");
    tdCity.textContent = data[i].city;

    const tdFounded = document.createElement("td");
    tdFounded.textContent = data[i].founded;

    const tdDetail = document.createElement("td");
    tdDetail.innerHTML = `<a href="detail.html?id=${i}">View</a>`;

    row.appendChild(tdIndex);
    row.appendChild(tdCompany);
    row.appendChild(tdSector);
    row.appendChild(tdCity);
    row.appendChild(tdFounded);
    row.appendChild(tdDetail);
    tbody.appendChild(row);
  }

  document.getElementById("companyTable").style.display = "table";
}

document.addEventListener("DOMContentLoaded", () => companyList());
window.addEventListener("pageshow", () => companyList());
