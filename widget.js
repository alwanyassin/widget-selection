        // Buat shadow root
        const container = document.getElementById('widget-container');
        const shadowRoot = container.attachShadow({ mode: 'open' });
        
        // Data untuk multi bahasa
        const translations = {
            id: {
                selectPlaceholder: "Pilih Kebutuhan Anda:",
                options: [
                    { text: "Kemewahan Yang Tetap Terjangkau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
                    { text: "Rumah Harga < 1 Miliar", value: "url:https://www.podomoropark.com/id/cluster/patragriya" },
                    { text: "Rumah Harga > 1 Miliar", value: "grid:sultan" },
                    { text: "Rumah Pinggir Danau", value: "url:https://www.podomoropark.com/id/cluster/brahmapuri" },
                    { text: "Rumah Kost", value: "url:https://www.podomoropark.com/id/cluster/naragriya" },
                    { text: "Lahan Siap Bangun", value: "url:https://www.podomoropark.com/id/cluster/dharmapuri" },
                    { text: "Ruko", value: "grid:ruko" },
                    { text: "Area Komersial", value: "url:https://www.podomoropark.com/id/commercial" },
                    { text: "Fasilitas", value: "url:https://www.podomoropark.com/id/facilities" },
                    { text: "Berita & Acara", value: "url:https://www.podomoropark.com/id/article/news" }
                ],
                buttonText: "Lanjut",
                gridItems: {
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
                }
            },
            en: {
                selectPlaceholder: "Choose Your Needs:",
                options: [
                    { text: "Luxuriously Affordable", value: "url:https://www.podomoropark.com/en/cluster/brahmapuri" },
                    { text: "Homes < 1 Billion", value: "url:https://www.podomoropark.com/en/cluster/patragriya" },
                    { text: "Homes > 1 Billion", value: "grid:sultan" },
                    { text: "Lakeside Homes", value: "url:https://www.podomoropark.com/en/cluster/brahmapuri" },
                    { text: "Student House", value: "url:https://www.podomoropark.com/en/cluster/naragriya" },
                    { text: "Ready to Build Lot", value: "url:https://www.podomoropark.com/en/cluster/dharmapuri" },
                    { text: "Shophouse", value: "grid:ruko" },
                    { text: "Commercial Area", value: "url:https://www.podomoropark.com/en/commercial" },
                    { text: "Facilities", value: "url:https://www.podomoropark.com/en/facilities" },
                    { text: "News & Events", value: "url:https://www.podomoropark.com/en/article/news" }
                ],
                buttonText: "Go",
                gridItems: {
                    sultan: [
                        { name: "Fashagriya", url: "https://www.podomoropark.com/en/cluster/fashagriya" }, 
                        { name: "Wangsagriya", url: "https://www.podomoropark.com/en/cluster/wangsagriya" },
                        { name: "Padmagriya", url: "https://www.podomoropark.com/en/cluster/padmagriya" },
                        { name: "Sadyagriya", url: "https://www.podomoropark.com/en/cluster/sadyagriya" }
                    ],
                    ruko: [
                        { name: "Neo Plaza", url: "https://www.podomoropark.com/en/ruko" },
                        { name: "La Plaza", url: "https://www.podomoropark.com/en/laplaza" }
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
                // Tambahkan Tailwind CSS yang sudah dibuild
                const tailwindCSS = document.createElement('style');
                tailwindCSS.textContent = `
                    /*! tailwindcss v4.1.7 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-emerald-600: oklch(59.6% 0.145 163.225);
    --color-emerald-700: oklch(50.8% 0.118 165.612);
    --color-blue-500: oklch(62.3% 0.214 259.815);
    --color-purple-200: oklch(90.2% 0.063 306.703);
    --color-slate-50: oklch(98.4% 0.003 247.858);
    --color-slate-100: oklch(96.8% 0.007 247.896);
    --color-slate-200: oklch(92.9% 0.013 255.508);
    --color-slate-800: oklch(27.9% 0.041 260.031);
    --color-white: #fff;
    --spacing: 0.25rem;
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
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
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
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .h-2 {
    height: calc(var(--spacing) * 2);
  }
  .h-12 {
    height: calc(var(--spacing) * 12);
  }
  .h-32 {
    height: calc(var(--spacing) * 32);
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-full {
    width: 100%;
  }
  .max-w-6xl {
    max-width: var(--container-6xl);
  }
  .flex-1 {
    flex: 1;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .flex-row {
    flex-direction: row;
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
  .overflow-hidden {
    overflow: hidden;
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .border-0 {
    border-style: var(--tw-border-style);
    border-width: 0px;
  }
  .border-slate-200 {
    border-color: var(--color-slate-200);
  }
  .bg-blue-500 {
    background-color: var(--color-blue-500);
  }
  .bg-emerald-600 {
    background-color: var(--color-emerald-600);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-gradient-to-b {
    --tw-gradient-position: to bottom in oklab;
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
  .from-slate-50 {
    --tw-gradient-from: var(--color-slate-50);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-slate-100 {
    --tw-gradient-to: var(--color-slate-100);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
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
  .text-slate-800 {
    color: var(--color-slate-800);
  }
  .text-white {
    color: var(--color-white);
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
  .sm\:grid-cols-2 {
    @media (width >= 40rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
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
      --tw-duration: initial;
    }
  }
}

                `;
                
                // Memuat CSS Flowbite
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
                    <div class="bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
                        <div class="max-w-6xl mx-auto">
                            <div class="mb-8">
                                <div class="flex flex-row gap-3">
                                    <div class="relative flex-1">
                                        <select id="dynamic-select" class="w-full bg-white border-slate-200 shadow-sm h-12 pl-4 pr-8 rounded-lg">
                                            <option value="">${langData.selectPlaceholder}</option>
                                            ${selectOptions}
                                        </select>
                                    </div>
                                    <button id="go" class="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg font-medium">${langData.buttonText}</button>
                                </div>
                            </div>
                            <!-- Container grid (hidden awal) -->
                            <div id="grid-container" class="hidden mx-auto">
                                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6"></div>
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
                const grid = shadowRoot.querySelector('.grid');
                
                grid.innerHTML = '';
                
                translations[lang].gridItems[type].forEach(item => {
                    const gridItem = document.createElement('div');
                    gridItem.className = 'grid-item overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group';
                    gridItem.innerHTML = `<div class="h-2 bg-blue-500 shadow-purple-200"></div>
                    <div class="p-6 mx-auto h-32">
                    <h3 class="text-xl font-bold text-slate-800 mb-2">${item.name}</h3>
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
