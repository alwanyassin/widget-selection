const gridData = {
    sultan: [
        { name: "Fashagriya", url: "https://www.podomoropark.com/id/cluster/fashagriya" }, 
        { name: "Wangsagriya", url: "https://www.podomoropark.com/id/cluster/wangsagriya" },
        { name: "Padmagriya", url: "https://www.podomoropark.com/id/cluster/padmagriya" },
        { name: "Sadyagriya", url: "https://www.podomoropark.com/id/cluster/sadyagriya" }
    ],
    ruko: [
        { name: "Neo Plaza", url: "https://www.podomoropark.com/id/ruko" },
        { name: "La Plaza", url: "https://www.podomoropark.com/id/laplaza" }
    ]
};
document.getElementById('go').addEventListener('click', () => {
    const selectedValue = document.getElementById('dynamic-select').value;
    // Reset state sebelumnya
    document.getElementById('grid-container').classList.add('hidden');
    
    // Cek tipe aksi
    if (selectedValue.startsWith('url:')) {
        // Kondisi 1: Navigasi ke URL
        const path = selectedValue.split('url:')[1];
        window.location.href = path;
        
    } else if (selectedValue.startsWith('grid:')) {
        // Kondisi 2: Tampilkan grid
        const gridType = selectedValue.split(':')[1];
        showGrid(gridType);
    }
});

// Fungsi tampilkan grid
function showGrid(type) {
  const gridContainer = document.getElementById('grid-container');
  const grid = document.querySelector('.grid');
  
  grid.innerHTML = ''; // Kosongkan grid sebelumnya
  
  gridData[type].forEach(item => {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group';
    gridItem.innerHTML = `<div class="h-2 bg-blue-500 shadow-purple-200"></div>
    <div class="p-6 mx-auto h-32">
    <h3 class="text-xl font-bold text-slate-800 mb-2">${item.name}</h3>
    </div>
    `;
    
    // Style dinamis
    // gridItem.style.backgroundColor = item.color;
    gridItem.style.cursor = 'pointer';
    
    // Tambahkan efek hover
    gridItem.addEventListener('mouseenter', () => {
      gridItem.style.transform = 'scale(1.02)';
    });
    gridItem.addEventListener('mouseleave', () => {
      gridItem.style.transform = 'scale(1)';
    });
    
    // Klik untuk navigasi
    gridItem.addEventListener('click', () => {
      window.location.href = item.url;
    });
    
    grid.appendChild(gridItem);
  });
  
  gridContainer.classList.remove('hidden');
}