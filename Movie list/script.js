let allMovies = [];
let filteredMovies = [];
let currentPage = 1;
const rowsPerPage = 10;

const tableBody = document.getElementById("tableBody");
const paginationInfo = document.getElementById("paginationInfo");
const paginationControls = document.getElementById("paginationControls");
const searchInput = document.getElementById("searchInput");

function showSpinner() {
  document.getElementById("loader-overlay").style.display = "flex";
}

function hideSpinner() {
  document.getElementById("loader-overlay").style.display = "none";
}

// 1. Fetch Data from API
async function loadTable() {
  showSpinner();
  try {
    const response = await fetch("https://api.tvmaze.com/shows/30/episodes");
    if (!response.ok) throw new Error("Failed to fetch data");

    allMovies = await response.json();
    filteredMovies = allMovies; // Initialize filtered list with all data

    currentPage = 1;
    displayData();
    setTimeout(hideSpinner, 500);
  } catch (error) {
    console.error(error);
    hideSpinner();
  }
}

// 2. Main Display Function (Handles Table + Pagination)
function displayData() {
  tableBody.innerHTML = "";

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedItems = filteredMovies.slice(startIndex, endIndex);

  if (paginatedItems.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color: #999;">No movies found matching your search.</td></tr>`;
    updatePaginationUI(0);
    return;
  }

  paginatedItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="text-center">${startIndex + index + 1}</td>
      <td><strong>${item.name}</strong></td>
      <td>${item.type}</td>
      <td class="text-center">
        <img src="${item.image?.medium}" class="movie-thumb" alt="poster">
      </td>
      <td>${item.airdate}</td>
      <td>${item.runtime} min</td>
      <td class="text-center">
        <span style="background:#fef3c7; color: #92400e; padding:4px 8px; border-radius:4px; font-weight: bold;">
          ${item.rating?.average || "N/A"}
        </span>
      </td>
    `;
    tableBody.appendChild(row);
  });

  updatePaginationUI(filteredMovies.length);
}

// 3. Update Pagination Controls
function updatePaginationUI(totalItems) {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startCount = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endCount = Math.min(currentPage * rowsPerPage, totalItems);

  paginationInfo.innerText = `Showing ${startCount}-${endCount} of ${totalItems} movies`;
  paginationControls.innerHTML = "";

  if (totalPages <= 1) return; // Hide buttons if only one page

  // Previous Button
  const prevBtn = document.createElement("button");
  prevBtn.className = "page-btn";
  prevBtn.innerText = "Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    displayData();
  };
  paginationControls.appendChild(prevBtn);

  // Dynamic Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `page-btn ${i === currentPage ? "active" : ""}`;
    btn.innerText = i;
    btn.onclick = () => {
      currentPage = i;
      displayData();
    };
    paginationControls.appendChild(btn);
  }

  // Next Button
  const nextBtn = document.createElement("button");
  nextBtn.className = "page-btn";
  nextBtn.innerText = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    displayData();
  };
  paginationControls.appendChild(nextBtn);
}

// 4. LIVE FILTER LOGIC (Triggered on every keystroke)
searchInput.addEventListener("input", function () {
  const term = this.value.toLowerCase();

  filteredMovies = allMovies.filter(
    (movie) =>
      movie.name.toLowerCase().includes(term) ||
      movie.type.toLowerCase().includes(term),
  );

  currentPage = 1; // Always reset to page 1 when searching
  displayData();
});

// 5. Clear Button Logic
document.getElementById("btnClear").addEventListener("click", () => {
  searchInput.value = "";
  filteredMovies = allMovies;
  currentPage = 1;
  displayData();
});

// Initial Load Trigger
document.getElementById("BtShow").addEventListener("click", loadTable);
