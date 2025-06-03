// Tambahkan Google Fonts ke <head>
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap';
document.head.appendChild(fontLink);

// Tambahkan Tailwind CSS ke <head>
const tailwindLink = document.createElement('link');
tailwindLink.rel = 'stylesheet';
tailwindLink.href = '/src/output.css';
document.head.appendChild(tailwindLink);

const customStyle = document.createElement('style');
customStyle.textContent = `
  .scale-hover {
    transition: transform 0.2s ease-in-out;
  }
  .scale-hover:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(customStyle);


// Data multi bahasa
const translations = {
  id: {
    selectPlaceholder: "Pilih Kebutuhan Anda:",
    options: [
      { text: "Kemewahan Yang Terjangkau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
      { text: "Rumah Harga < 1 Milliar", value: "url:https://www.podomoropark.com/id/cluster/patragriya" },
      { text: "Rumah Harga > 1 Milliar", value: "grid:sultan" },
      { text: "Rumah Pinggir Danau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
      { text: "Lahan Siap Bangun", value: "url:https://www.podomoropark.com/id/cluster/dharmapuri" },
      { text: "Pilihan Investasi", value: "grid:investasi" },
      { text: "Lahan Komersial", value: "url:https://www.podomoropark.com/id/commercial" },
      { text: "Fasilitas", value: "url:https://www.podomoropark.com/id/facilities" },
      { text: "Berita & Acara", value: "url:https://www.podomoropark.com/id/article/news" }
    ],
    buttonText: "Lanjut",
    gridItems: {
      sultan: [
        { name: "Fashagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/fashagriya", img: "/src/img/fashagriya.png" }, 
        { name: "Wangsagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/wangsagriya", img: "/src/img/wangsagriya.png" },
        { name: "Padmagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/padmagriya", img: "/src/img/padmagriya.png" },
        { name: "Sadyagriya<br> Cluster", url: "https://www.podomoropark.com/id/cluster/sadyagriya", img: "/src/img/sadyagriya.png" }
      ],
      investasi: [
        { name: "Neo Plaza", url: "https://www.podomoropark.com/id/ruko", img: "/src/img/neoplaza.png" },
        { name: "La Plaza", url: "https://www.podomoropark.com/id/laplaza", img: "/src/img/laplaza.png" },
        { name: "Student<br> House", url: "https://www.podomoropark.com/id/cluster/naragriya", img: "/src/img/studenthouse.png" }
      ]
    }
  }
};

// Dapatkan bahasa dari URL
function getLanguageFromURL() {
  const path = window.location.pathname;
  if (path.includes('/en')) return 'en';
  if (path.includes('/id')) return 'id';
  return 'id';
}

// Inisialisasi widget tanpa Shadow DOM
function initWidget() {
  const lang = getLanguageFromURL();
  const data = translations[lang];
  const container = document.getElementById('widget-container');

  // Buat select options
  const selectOptions = data.options.map(option =>
    `<option value="${option.value}">${option.text}</option>`
  ).join('');

  // Masukkan HTML ke dalam container
  container.innerHTML = `
    <div class="font-josefin bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div class="max-w-6xl mx-auto">
        <div class="mb-8">
          <div class="flex flex-row gap-3">
            <div class="relative flex-1">
              <select id="dynamic-select" class="bg-[#eceef0] w-full border-slate-200 focus:ring-[#08594c] shadow-lg h-12 pl-4 pr-8 rounded-lg">
                <option value="">${data.selectPlaceholder}</option>
                ${selectOptions}
              </select>
            </div>
            <button id="go" class="h-12 px-6 bg-[#08594c] hover:bg-emerald-700 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-lg font-medium">
              <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
              </svg>
            </button>
          </div>
        </div>
        <div id="grid-container" class="hidden mx-auto">
          <div class="flex flex-wrap justify-center gap-6 mb-16" id="grid-content"></div>
        </div>
      </div>
    </div>
  `;

  // Tambahkan event
  document.getElementById('go').addEventListener('click', () => {
    const selected = document.getElementById('dynamic-select').value;
    const gridWrapper = document.getElementById('grid-container');
    const grid = document.getElementById('grid-content');
    gridWrapper.classList.add('hidden');

    if (selected.startsWith('url:')) {
      window.location.href = selected.split('url:')[1];
    } else if (selected.startsWith('grid:')) {
      const type = selected.split(':')[1];
      grid.innerHTML = '';
      translations[lang].gridItems[type].forEach(item => {
        const div = document.createElement('div');
        div.className = 'w-full md:w-[calc(50%-12px)] max-w-md';
        div.innerHTML = `
          <div class="rounded-xl overflow-hidden flex shadow-lg cursor-pointer scale-hover">
            <div class="bg-gradient-to-t from-[#308377] to-[#286E63] text-white p-6 flex flex-col justify-center min-w-[180px]">
              <h3 class="text-xl font-bold">${item.name}</h3>
            </div>
            <div class="flex-grow h-[110px]">
              <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover" />
            </div>
          </div>
        `;
        div.addEventListener('click', () => window.location.href = item.url);

        grid.appendChild(div);
      });
      gridWrapper.classList.remove('hidden');
    }
  });
}

// Jalankan widget
initWidget();

// Tambahkan Flowbite CSS dan JS setelah widget di-load
const flowbiteCSS = document.createElement('link');
flowbiteCSS.rel = 'stylesheet';
flowbiteCSS.href = 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css';
document.head.appendChild(flowbiteCSS);

const flowbiteJS = document.createElement('script');
flowbiteJS.src = 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js';
document.body.appendChild(flowbiteJS);
