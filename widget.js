        // Buat shadow root
        const container = document.getElementById('widget-container');
        const shadowRoot = container.attachShadow({ mode: 'open' });
        
        // Data untuk multi bahasa
        const translations = {
            id: {
                selectPlaceholder: "Pilih Kebutuhan Anda:",
                options: [
                    { text: "Kemewahan Yang Terjangkau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
                    { text: "Rumah Harga < 1 Milliar", value: "url:https://www.podomoropark.com/id/cluster/patragriya" },
                    { text: "Rumah Harga > 1 Milliar", value: "grid:sultan" },
                    { text: "Rumah Pinggir Danau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
                    // { text: "Rumah Kost", value: "url:https://www.podomoropark.com/id/cluster/naragriya" },
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
            },
            en: {
                selectPlaceholder: "Choose Your Needs:",
                options: [
                    { text: "Luxuriously Affordable", value: "url:https://www.podomoropark.com/en/cluster/brahmapuri" },
                    { text: "Homes < 1 Billion", value: "url:https://www.podomoropark.com/en/cluster/patragriya" },
                    { text: "Homes > 1 Billion", value: "grid:sultan" },
                    { text: "Lakeside Homes", value: "url:https://www.podomoropark.com/en/cluster/brahmapuri" },
                    // { text: "Student House", value: "url:https://www.podomoropark.com/en/cluster/naragriya" },
                    { text: "Ready to Build Lot", value: "url:https://www.podomoropark.com/en/cluster/dharmapuri" },
                    { text: "Investment Choices", value: "grid:investasi" },
                    { text: "Commercial Area", value: "url:https://www.podomoropark.com/en/commercial" },
                    { text: "Facilities", value: "url:https://www.podomoropark.com/en/facilities" },
                    { text: "News & Events", value: "url:https://www.podomoropark.com/en/article/news" }
                ],
                buttonText: "Go",
                gridItems: {
                    sultan: [
                        { name: "Fashagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/fashagriya", img: "/src/img/fashagriya.png" }, 
                        { name: "Wangsagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/wangsagriya", img: "/src/img/wangsagriya.png" },
                        { name: "Padmagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/padmagriya", img: "/src/img/padmagriya.png" },
                        { name: "Sadyagriya<br> Cluster", url: "https://www.podomoropark.com/en/cluster/sadyagriya", img: "/src/img/sadyagriya.png" }
                    ],
                    investasi: [
                        { name: "Neo Plaza", url: "https://www.podomoropark.com/en/ruko", img: "/src/img/neoplaza.png" },
                        { name: "La Plaza", url: "https://www.podomoropark.com/en/laplaza", img: "/src/img/laplaza.png" },
                        { name: "Student<br> House", url: "https://www.podomoropark.com/en/cluster/naragriya", img: "/src/img/studenthouse.png" }
                    ]
                }
            }
        };

        // Fungsi untuk memeriksa bahasa dari URL
        function getLanguageFromURL() {
            const path = window.location.pathname;
            if (path.includes('/en')) return 'en';
            if (path.includes('/id')) return 'id';
            return 'id'; // Default bahasa Indonesia
        }

        // Fungsi untuk memuat CSS eksternal
        async function loadCSS(url) {
            try {
                const response = await fetch(url);
                const cssText = await response.text();
                const style = document.createElement('style');
                style.textContent = cssText;
                return style;
            } catch (error) {
                console.error('Gagal memuat CSS:', url, error);
                return null;
            }
        }
        
        // Memuat dan menginisialisasi widget
        async function initWidget() {
            const currentLanguage = getLanguageFromURL();
            const langData = translations[currentLanguage];
            
            try {


                // Tambahkan link font ke Shadow DOM
                const fontLink = document.createElement('link');
                fontLink.rel = 'stylesheet';
                fontLink.href = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap';
                shadowRoot.appendChild(fontLink);

                // Tambahkan Tailwind CSS yang sudah dibuild
                const tailwindCSS = document.createElement('style');
                tailwindCSS.textContent = `
/*! tailwindcss v4.1.8 | MIT License | https://tailwindcss.com */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-amber-300: oklch(87.9% 0.169 91.605);
    --color-emerald-600: oklch(59.6% 0.145 163.225);
    --color-emerald-700: oklch(50.8% 0.118 165.612);
    --color-blue-500: oklch(62.3% 0.214 259.815);
    --color-indigo-600: oklch(51.1% 0.262 276.966);
    --color-violet-600: oklch(54.1% 0.281 293.009);
    --color-purple-200: oklch(90.2% 0.063 306.703);
    --color-slate-50: oklch(98.4% 0.003 247.858);
    --color-slate-100: oklch(96.8% 0.007 247.896);
    --color-slate-200: oklch(92.9% 0.013 255.508);
    --color-slate-400: oklch(70.4% 0.04 256.788);
    --color-slate-800: oklch(27.9% 0.041 260.031);
    --color-gray-800: oklch(27.8% 0.033 256.848);
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-md: 28rem;
    --container-lg: 32rem;
    --container-2xl: 42rem;
    --container-6xl: 72rem;
    --text-xl: 1.25rem;
    --text-xl--line-height: calc(1.75 / 1.25);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --text-3xl: 1.875rem;
    --text-3xl--line-height: calc(2.25 / 1.875);
    --font-weight-medium: 500;
    --font-weight-bold: 700;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
    --font-josefin: "Josefin Sans", sans-serif;
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .relative {
    position: relative;
  }
  .container {
    width: 100%;
    @media (width >= 40rem) {
      max-width: 40rem;
    }
    @media (width >= 48rem) {
      max-width: 48rem;
    }
    @media (width >= 64rem) {
      max-width: 64rem;
    }
    @media (width >= 80rem) {
      max-width: 80rem;
    }
    @media (width >= 96rem) {
      max-width: 96rem;
    }
  }
  .mx-auto {
    margin-inline: auto;
  }
  .mb-2 {
    margin-bottom: calc(var(--spacing) * 2);
  }
  .mb-4 {
    margin-bottom: calc(var(--spacing) * 4);
  }
  .mb-8 {
    margin-bottom: calc(var(--spacing) * 8);
  }
  .mb-16 {
    margin-bottom: calc(var(--spacing) * 16);
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .table {
    display: table;
  }
  .h-2 {
    height: calc(var(--spacing) * 2);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
  }
  .h-12 {
    height: calc(var(--spacing) * 12);
  }
  .h-32 {
    height: calc(var(--spacing) * 32);
  }
  .h-40 {
    height: calc(var(--spacing) * 40);
  }
  .h-\[110px\] {
    height: 110px;
  }
  .h-\[150px\] {
    height: 150px;
  }
  .h-full {
    height: 100%;
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-6 {
    width: calc(var(--spacing) * 6);
  }
  .w-full {
    width: 100%;
  }
  .max-w-2xl {
    max-width: var(--container-2xl);
  }
  .max-w-6xl {
    max-width: var(--container-6xl);
  }
  .max-w-40 {
    max-width: calc(var(--spacing) * 40);
  }
  .max-w-80 {
    max-width: calc(var(--spacing) * 80);
  }
  .max-w-\[160px\] {
    max-width: 160px;
  }
  .max-w-lg {
    max-width: var(--container-lg);
  }
  .max-w-md {
    max-width: var(--container-md);
  }
  .min-w-\[160px\] {
    min-width: 160px;
  }
  .min-w-\[170px\] {
    min-width: 170px;
  }
  .min-w-\[180px\] {
    min-width: 180px;
  }
  .flex-1 {
    flex: 1;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .border-collapse {
    border-collapse: collapse;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .resize {
    resize: both;
  }
  .appearance-none {
    appearance: none;
  }
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .justify-center {
    justify-content: center;
  }
  .gap-1 {
    gap: calc(var(--spacing) * 1);
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3);
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  .gap-6 {
    gap: calc(var(--spacing) * 6);
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .rounded-xl {
    border-radius: var(--radius-xl);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-0 {
    border-style: var(--tw-border-style);
    border-width: 0px;
  }
  .border-slate-200 {
    border-color: var(--color-slate-200);
  }
  .bg-\[\#1a7a5d\] {
    background-color: #1a7a5d;
  }
  .bg-\[\#08594c\] {
    background-color: #08594c;
  }
  .bg-\[\#eceef0\] {
    background-color: #eceef0;
  }
  .bg-\[08594c\] {
    background-color: 08594c;
  }
  .bg-blue-500 {
    background-color: var(--color-blue-500);
  }
  .bg-emerald-600 {
    background-color: var(--color-emerald-600);
  }
  .bg-slate-50 {
    background-color: var(--color-slate-50);
  }
  .bg-slate-100 {
    background-color: var(--color-slate-100);
  }
  .bg-slate-400 {
    background-color: var(--color-slate-400);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-linear-to-t {
    --tw-gradient-position: to top;
    @supports (background-image: linear-gradient(in lab, red, red)) {
      --tw-gradient-position: to top in oklab;
    }
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
  .bg-gradient-to-b {
    --tw-gradient-position: to bottom in oklab;
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
  .bg-gradient-to-t {
    --tw-gradient-position: to top in oklab;
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
  .from-\[\#308377\] {
    --tw-gradient-from: #308377;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .from-\[\#F7F8F9\] {
    --tw-gradient-from: #F7F8F9;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .from-slate-50 {
    --tw-gradient-from: var(--color-slate-50);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .from-violet-600 {
    --tw-gradient-from: var(--color-violet-600);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-\[\#286E63\] {
    --tw-gradient-to: #286E63;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-\[\#1365b8\] {
    --tw-gradient-to: #1365b8;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-\[\#ECEEF0\] {
    --tw-gradient-to: #ECEEF0;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-indigo-600 {
    --tw-gradient-to: var(--color-indigo-600);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-slate-100 {
    --tw-gradient-to: var(--color-slate-100);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-slate-200 {
    --tw-gradient-to: var(--color-slate-200);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .object-contain {
    object-fit: contain;
  }
  .object-cover {
    object-fit: cover;
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .p-6 {
    padding: calc(var(--spacing) * 6);
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .pr-8 {
    padding-right: calc(var(--spacing) * 8);
  }
  .pl-4 {
    padding-left: calc(var(--spacing) * 4);
  }
  .font-josefin {
    font-family: var(--font-josefin);
  }
  .text-2xl {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
  }
  .text-xl {
    font-size: var(--text-xl);
    line-height: var(--tw-leading, var(--text-xl--line-height));
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .text-blue-500 {
    color: var(--color-blue-500);
  }
  .text-gray-800 {
    color: var(--color-gray-800);
  }
  .text-slate-800 {
    color: var(--color-slate-800);
  }
  .text-white {
    color: var(--color-white);
  }
  .underline {
    text-decoration-line: underline;
  }
  .shadow {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-lg {
    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-md {
    --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-purple-200 {
    --tw-shadow-color: oklch(90.2% 0.063 306.703);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, var(--color-purple-200) var(--tw-shadow-alpha), transparent);
    }
  }
  .outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, visibility, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .duration-300 {
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
  .hover\:bg-amber-300 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-amber-300);
      }
    }
  }
  .hover\:bg-emerald-700 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-emerald-700);
      }
    }
  }
  .hover\:shadow-lg {
    &:hover {
      @media (hover: hover) {
        --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
      }
    }
  }
  .hover\:shadow-xl {
    &:hover {
      @media (hover: hover) {
        --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
      }
    }
  }
  .focus\:ring-\[\#08594c\] {
    &:focus {
      --tw-ring-color: #08594c;
    }
  }
  .sm\:grid-cols-2 {
    @media (width >= 40rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .md\:w-\[calc\(50\%-12px\)\] {
    @media (width >= 48rem) {
      width: calc(50% - 12px);
    }
  }
  .md\:gap-6 {
    @media (width >= 48rem) {
      gap: calc(var(--spacing) * 6);
    }
  }
  .md\:p-8 {
    @media (width >= 48rem) {
      padding: calc(var(--spacing) * 8);
    }
  }
  .md\:text-3xl {
    @media (width >= 48rem) {
      font-size: var(--text-3xl);
      line-height: var(--tw-leading, var(--text-3xl--line-height));
    }
  }
  .lg\:grid-cols-2 {
    @media (width >= 64rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .dark\:text-white {
    @media (prefers-color-scheme: dark) {
      color: var(--color-white);
    }
  }
}
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-gradient-position {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-via {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-to {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-via-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0%;
}
@property --tw-gradient-via-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 50%;
}
@property --tw-gradient-to-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-border-style: solid;
      --tw-gradient-position: initial;
      --tw-gradient-from: #0000;
      --tw-gradient-via: #0000;
      --tw-gradient-to: #0000;
      --tw-gradient-stops: initial;
      --tw-gradient-via-stops: initial;
      --tw-gradient-from-position: 0%;
      --tw-gradient-via-position: 50%;
      --tw-gradient-to-position: 100%;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-duration: initial;
    }
  }
}
                `;
                
                // // Memuat CSS Flowbite
                const flowbiteCSS = await loadCSS('https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css');
                
                // Tambahkan CSS kustom
                const customCSS = document.createElement('style');
                customCSS.textContent = `
                    .grid-item {
                        border-radius: 8px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        transition: all 0.3s ease;
                    }
                    
                    .grid-item:hover {
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    }
                    
                    .hidden {
                        display: none;
                    }
                    
                    /* Style select */
                    #dynamic-select {
                        padding: 8px 12px;
                        font-size: 16px;
                        border-radius: 4px;
                    }
                `;
                
                // Generate options untuk select
                const selectOptions = langData.options.map(option => 
                    `<option value="${option.value}">${option.text}</option>`
                ).join('');
                
                // Tambahkan HTML ke Shadow DOM
                shadowRoot.innerHTML = `
                    <div class="font-josefin p-4 md:p-8">
                        <div class="max-w-6xl mx-auto">
                            <div class="mb-8">
                                <div class="flex flex-row gap-3">
                                    <div class="relative flex-1">
                                        <select id="dynamic-select" class="appearance-none bg-emerald-700 w-full border-slate-200 focus:ring-[#08594c] shadow-lg h-12 pl-4 pr-8 rounded-lg">
                                            <option value="">${langData.selectPlaceholder}</option>
                                            ${selectOptions}
                                        </select>
                                    </div>
                                    <button id="go" class="h-12 px-6 bg-[#08594c] hover:bg-emerald-700 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-lg font-medium">
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <!-- Container grid (hidden awal) -->
                            <div id="grid-container" class="hidden mx-auto">
                                <div class="flex flex-wrap justify-center gap-6 mb-16"></div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Tambahkan CSS ke Shadow DOM
                shadowRoot.prepend(customCSS);
                if (flowbiteCSS) shadowRoot.prepend(flowbiteCSS);
                shadowRoot.prepend(tailwindCSS);
                
                // Inisialisasi JavaScript
                initScript(currentLanguage);
                
                // Memuat Flowbite JS setelah DOM siap
                const flowbiteJS = document.createElement('script');
                flowbiteJS.src = 'https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js';
                shadowRoot.appendChild(flowbiteJS);
                
            } catch (error) {
                console.error('Gagal memuat widget:', error);
            }
        }
        
        function initScript(currentLanguage) {
            const langData = translations[currentLanguage];
            
            // Fungsi untuk mengubah bahasa
            function changeLanguage(lang) {
                const newUrl = window.location.pathname.includes('/en') || window.location.pathname.includes('/id') 
                    ? window.location.pathname.replace(/\/en|\/id/, `/${lang}`)
                    : `/${lang}${window.location.pathname}`;
                
                window.history.pushState({}, '', newUrl);
                initWidget(); // Memuat ulang widget dengan bahasa baru
            }
            
            // Event listener untuk tombol bahasa
            shadowRoot.querySelectorAll('.language-toggle').forEach(button => {
                button.addEventListener('click', () => {
                    changeLanguage(button.dataset.lang);
                });
            });
            
            shadowRoot.getElementById('go').addEventListener('click', () => {
                const selectedValue = shadowRoot.getElementById('dynamic-select').value;
                shadowRoot.getElementById('grid-container').classList.add('hidden');
                
                if (selectedValue.startsWith('url:')) {
                    const path = selectedValue.split('url:')[1];
                    window.location.href = path;
                } else if (selectedValue.startsWith('grid:')) {
                    const gridType = selectedValue.split(':')[1];
                    showGrid(gridType, currentLanguage);
                }
            });
            
            function showGrid(type, lang) {
                const gridContainer = shadowRoot.getElementById('grid-container');
                const grid = shadowRoot.querySelector('.flex-wrap');
                
                grid.innerHTML = '';
                
                translations[lang].gridItems[type].forEach(item => {
                    const gridItem = document.createElement('div');
                    gridItem.className = 'w-full md:w-[calc(50%-12px)] max-w-md';
                    gridItem.innerHTML = `<div class="rounded-xl overflow-hidden flex shadow-lg">
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
                    
                    gridItem.style.cursor = 'pointer';
                    gridItem.addEventListener('mouseenter', () => gridItem.style.transform = 'scale(1.02)');
                    gridItem.addEventListener('mouseleave', () => gridItem.style.transform = 'scale(1)');
                    gridItem.addEventListener('click', () => window.location.href = item.url);
                    
                    grid.appendChild(gridItem);
                });
                
                gridContainer.classList.remove('hidden');
            }
        }
        
        // Jalankan inisialisasi
        initWidget();
