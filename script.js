document.addEventListener("DOMContentLoaded", function () {
/*
    let excludedFamilies = ["HuangYou", "XiaoWei", "Akari", "Akebono", "Adlam", "Anatolian", "Arabic", "Armenian", "Avestan", "Balinese", "Bamum", "Bassa Vah", "Batak", "Bengali", "Bhaiksuki", "Brahmi", "Buginese", "Buhid", "Canadian Aboriginal", "Carian", "Caucasian Albanian", "Chakma", "Cham", "Cherokee", "Chorasmian", "Coptic", "Cuneiform", "Cypriot", "Cypro Minoan", "Deseret", "Devanagari", "Display", "Duployan", "Egyptian Hieroglyphs", "Elbasan", "Elymaic", "Ethiopic", "Georgian", "Glagolitic", "Gothic", "Grantha", "Gujarati", "Gunjala Gondi", "Gurmukhi", "HK", "Hanifi Rohingya", "Hanunoo", "Hatran", "Hebrew", "Imperial Aramaic", "Indic Siyaq Numbers", "Inscriptional Pahlavi", "Inscriptional Parthian", "JP", "Javanese", "KR", "Kaithi", "Kannada", "Kayah Li", "Kharoshthi", "Khmer", "Khojki", "Khudawadi", "Lao", "Lao Looped", "Lepcha", "Limbu", "Linear A", "Linear B", "Lisu", "Lycian", "Lydian", "Mahajani", "Malayalam", "Mandaic", "Manichaean", "Marchen", "Masaram Gondi", "Math", "Mayan Numerals", "Medefaidrin", "Meetei Mayek", "Mende Kikakui", "Meroitic", "Miao", "Modi", "Mongolian", "Mro", "Multani", "Myanmar", "NKo", "NKo Unjoined", "Nabataean", "Nag Mundari", "Nandinagari", "New Tai Lue", "Newa", "Nushu", "Ogham", "Ol Chiki", "Old Hungarian", "Old Italic", "Old North Arabian", "Old Permic", "Old Persian", "Old Sogdian", "Old South Arabian", "Old Turkic", "Oriya", "Osage", "Osmanya", "Pahawh Hmong", "Palmyrene", "Pau Cin Hau", "Phags Pa", "Phoenician", "Psalter Pahlavi", "Rejang", "Runic", "SC", "Samaritan", "Saurashtra", "Sharada", "Shavian", "Siddham", "SignWriting", "Sinhala", "Sogdian", "Sora Sompeng", "Soyombo", "Sundanese", "Syloti Nagri", "Symbols", "Symbols 2", "Syriac", "Syriac Eastern", "TC", "Tagalog", "Tagbanwa", "Tai Le", "Tai Tham", "Tai Viet", "Takri", "Tamil", "Tamil Supplement", "Tangsa", "Telugu", "Thaana", "Thai", "Thai Looped", "Tifinagh", "Tirhuta", "Ugaritic", "Vai", "Vithkuqi", "Wancho", "Warang Citi", "Yi", "Zanabazar Square"]


    fetch('gfonts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const fonts = document.getElementById('fonts');
            let htmlString = "";
            data.forEach(item => {
                let variants = item.variants;
                if (!excludedFamilies.some(family => item.family.includes(family))) {
                    htmlString += `<option data-variants="${variants.join(",")}">${item.family}</option>`;
                }
            });

            fonts.innerHTML = htmlString;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('content').innerText = 'Failed to load data';
        });
*/
    const fontsSelect = document.getElementById('fonts');
    const variantsSelect = document.getElementById('variants');
    const button = document.getElementById('make-code');
    const pre = document.getElementById('code-display');

    fontsSelect.addEventListener('change', function () {
        const selectedOption = fontsSelect.options[fontsSelect.selectedIndex];
        variantsSelect.innerHTML = '';

        const variants = selectedOption.getAttribute('data-variants');

        if (variants) {
            // Convertir las variantes en un array
            const variantsArray = variants.split(',');

            // Añadir cada variante como una nueva opción
            variantsArray.forEach(variant => {
                const option = document.createElement('option');
                if (variant == "regular") {
                    option.selected = true;
                }
                option.value = variant;
                option.textContent = variant.charAt(0).toUpperCase() + variant.slice(1);
                variantsSelect.appendChild(option);
            });
        }
    });

    variantsSelect.onmousedown = function(event) {
        if (event.shiftKey) return;
        event.preventDefault();
        this.focus();
        var scroll = this.scrollTop;
        event.target.selected = !event.target.selected;
        this.scrollTop = scroll;
        // make sure that other listeners (like Vue) pick up on the change
        // even though we prevented the default.
        this.dispatchEvent(new Event("change"));
    }

    button.addEventListener('click', function () {
        const selectedOption = fontsSelect.options[fontsSelect.selectedIndex];
        const fontFamily = selectedOption.textContent.replace(/\s+/g, '+');
        const selectedVariants = Array.from(variantsSelect.selectedOptions).map(option => option.value).join(',');
        const googleFontUrl = `https://fonts.googleapis.com/css?family=${fontFamily}:${selectedVariants}`;
        const code = "<link rel='stylesheet' href='"+ googleFontUrl+"' >";
        pre.textContent = code;
    });

    const copyCodeButton = document.getElementById('copy-code');
    copyCodeButton.addEventListener('click', function() {
        const codeToCopy = pre.textContent.trim();

        // Crear un elemento de textarea temporal para copiar el texto al portapapeles
        const textarea = document.createElement('textarea');
        textarea.value = codeToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Cambiar el texto del botón temporalmente para indicar que se ha copiado
        copyCodeButton.textContent = 'Code copied! Paste it before your own stylesheet.';
        setTimeout(function() {
            copyCodeButton.textContent = 'Copy code';
        }, 3000); // Vuelve al texto original después de 2 segundos
    });

});
