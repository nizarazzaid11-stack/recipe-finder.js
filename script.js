console.log('=== SKL 2 - RECIPE FINDER ===');

const $searchForm = document.getElementById('search-form');
const $searchInput = document.querySelector('#search-input');
const $recipeGrid = document.getElementById('recipe-grid');
const $recipeCount = document.getElementById('recipe-count');
const $resetBtn = document.getElementById('reset-btn');
const $favoriteCount = document.getElementById('favorite-count');
const $recipeDialog = document.getElementById('recipe-dialog');
const $dialogContent = document.getElementById('dialog-content');
const $closeDialog = document.getElementById('close-dialog');

// Data resep lebih banyak (lengkap dengan gambar pizza, burger, dll.)
const allRecipes = [
  {
    id: 1,
    name: "Classic Italian Pizza",
    cuisine: "Italian",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
    time: "25 mins",
    calories: "600 kcal",
    ingredients: ["Tepung terigu", "Keju Mozzarella", "Saus tomat", "Pepperoni", "Minyak zaitun"]
  },
  {
    id: 2,
    name: "Cheesy Beef Burger",
    cuisine: "American",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
    time: "20 mins",
    calories: "650 kcal",
    ingredients: ["Roti burger", "Daging patty sapi", "Keju cheddar", "Selada", "Tomat", "Saus sambal"]
  },
  {
    id: 3,
    name: "Healthy Fresh Salad",
    cuisine: "Mediterranean",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
    time: "10 mins",
    calories: "250 kcal",
    ingredients: ["Selada", "Tomat ceri", "Mentimun", "Minyak zaitun", "Keju feta"]
  },
  {
    id: 4,
    name: "Creamy Pasta Carbonara",
    cuisine: "Italian",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80",
    time: "30 mins",
    calories: "550 kcal",
    ingredients: ["Spaghetti", "Kuning telur", "Keju Parmesan", "Daging asap (smoked beef)", "Lada hitam"]
  },
  {
    id: 5,
    name: "Japanese Sushi Roll",
    cuisine: "Japanese",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80",
    time: "40 mins",
    calories: "350 kcal",
    ingredients: ["Nasi sushi", "Nori", "Ikan salmon", "Alpukat", "Timun jepang"]
  },
  {
    id: 6,
    name: "Warm Japanese Ramen",
    cuisine: "Japanese",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80",
    time: "35 mins",
    calories: "500 kcal",
    ingredients: ["Mie ramen", "Kaldu ayam", "Telur rebus", "Daging chashu", "Daun bawang"]
  }
];

let favoriteCount = 0;

// Fungsi Render Kartu Resep ke Layar
function renderRecipes(recipes) {
  if (recipes.length === 0) {
    $recipeGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">Resep tidak ditemukan 🥲</p>`;
  } else {
    $recipeGrid.innerHTML = recipes.map(recipe => `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <div class="recipe-body">
          <span class="recipe-cuisine">${recipe.cuisine}</span>
          <h3 class="recipe-title">${recipe.name}</h3>
          <div class="recipe-meta">
            <span>⏱️ ${recipe.time}</span> | <span>🔥 ${recipe.calories}</span>
          </div>
          <div class="recipe-actions">
            <button class="detail-btn" onclick="showDetail(${recipe.id})">Lihat Resep</button>
            <button class="like-btn" onclick="toggleLike(this)">❤️</button>
          </div>
        </div>
      </div>
    `).join('');
  }
  $recipeCount.textContent = `${recipes.length} recipes`;
}

// Fitur Tombol Like (Tanpa Refresh)
window.toggleLike = function(btn) {
  btn.classList.toggle('liked');
  if (btn.classList.contains('liked')) {
    favoriteCount++;
  } else {
    favoriteCount--;
  }
  $favoriteCount.textContent = favoriteCount;
};

// Fitur Klik Lihat Resep (Muncul Pop-up Modal)
window.showDetail = function(id) {
  const recipe = allRecipes.find(r => r.id === id);
  if (!recipe) return;

  $dialogContent.innerHTML = `
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" style="width:100%; height:180px; object-fit:cover; border-radius:8px; margin-bottom:10px;">
    <p><strong>Kategori:</strong> ${recipe.cuisine}</p>
    <p><strong>Waktu Masak:</strong> ${recipe.time} | <strong>Kalori:</strong> ${recipe.calories}</p>
    <h4>Bahan-bahan:</h4>
    <ul>
      ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
  `;
  $recipeDialog.showModal();
};

// Tutup Modal
$closeDialog.addEventListener('click', () => {$recipeDialog.close();
});

// Fitur Pencarian Real-Time (Tanpa Refresh Halaman)
$searchInput.addEventListener('input', function() {
  const keyword = $searchInput.value.toLowerCase().trim();
  const filtered = allRecipes.filter(r => 
    r.name.toLowerCase().includes(keyword) || r.cuisine.toLowerCase().includes(keyword)
  );

  renderRecipes(filtered);

  if (keyword.length > 0) {
    $resetBtn.style.display = 'block';
  } else {
    $resetBtn.style.display = 'none';
  }
});

// Mencegah form ke-submit / refresh saat tombol Search diklik
experimentsSearchForm = $searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
});

// Fitur Tombol Reset Otomatis
$resetBtn.addEventListener('click', function() {$searchInput.value = '';
  renderRecipes(allRecipes);
  $resetBtn.style.display = 'none';
});

// Jalankan saat pertama kali dibuka
renderRecipes(allRecipes);