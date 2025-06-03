const gridData = {
    sultan: [
        { name: "Fashagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/fashagriya", img: "/src/img/fashagriya.png" }, 
        { name: "Wangsagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/wangsagriya", img: "/src/img/wangsagriya.png" },
        { name: "Padmagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/padmagriya", img: "/src/img/padmagriya.png" },
        { name: "Sadyagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/sadyagriya", img: "/src/img/sadyagriya.png" }
    ],
    investasi: [
        { name: "Neo Plaza", url: "https://www.podomoropark.com/id/ruko", img: "/src/img/neoplaza.png" },
        { name: "La Plaza", url: "https://www.podomoropark.com/id/laplaza", img: "/src/img/laplaza.png" },
        { name: "Student House", url: "https://www.podomoropark.com/id/cluster/naragriya", img: "/src/img/studenthouse.png" }
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
  const grid = document.querySelector('.flex-wrap');
  
  grid.innerHTML = ''; // Kosongkan grid sebelumnya
  
  gridData[type].forEach(item => {
    const gridItem = document.createElement('div');
    gridItem.className = 'w-full md:w-[calc(50%-12px)] max-w-md';
    gridItem.innerHTML = `
    <div class="rounded-xl overflow-hidden flex shadow-lg">
            <div class="bg-gradient-to-t from-[#308377] to-[#286E63] text-white p-6 flex flex-col justify-center min-w-[180px]">
              <h3 class="text-xl font-bold">${item.name}</h3>
            </div>
            <div class="flex-grow h-[110px]">
              <img
                src="${item.img}"
                alt="${item.name}"
                class="w-full h-full object-cover"
              />
            </div>
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