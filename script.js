function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

let sura = document.getElementById("sura");
let oyat = document.getElementById("oyat");
let tugma = document.getElementById("search");

let loaded = document.getElementById("loading");

let nomi1 = document.getElementById("output-header1");
let nomi2 = document.getElementById("output-header2");
let audio = document.getElementById("output-audio");
let text = document.getElementById("output-text");
let textENG = document.getElementById("output-text-eng");
let textRUS = document.getElementById("output-text-rus");

let ism = document.getElementById("ism-familiya");
let textarea = document.getElementById("comment");
let send = document.getElementById("send");
let sent = document.getElementById("sent");

tugma.addEventListener("click", () => {
    text.innerHTML = "Tarjima yuklanmadi...";
    textENG.innerHTML = "Translation not uploaded...";
    textRUS.innerHTML = "Перевод не загружен...";
    let n1 = sura.value;
    let n2 = oyat.value;
    let r1 = httpGet("https://api.quran.sutanlab.id/surah/" + n1 + "/" + n2);
    let response1 = JSON.parse(r1);

    if (response1.code == 200) {
        nomi1.innerText = response1.data.surah.name.long;
        nomi2.innerHTML = response1.data.surah.name.transliteration.en + " / " + n2;
        audio.setAttribute("src", response1.data.audio.secondary[0]);
        let r2 = httpGet("https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-alauddinmansour/" + n1 + "/" + n2 + ".json");
        let response2 = JSON.parse(r2);
        text.innerHTML = response2.text;
        let rENG = httpGet("https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdelhaleem/" + n1 + "/" + n2 + ".json");
        let responseENG = JSON.parse(rENG);
        textENG.innerHTML = responseENG.text;
        let rRUS = httpGet("https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/rus-abuadel/" + n1 + "/" + n2 + ".json");
        let responseRUS = JSON.parse(rRUS);
        textRUS.innerHTML = responseRUS.text;
        httpGet("https://api.telegram.org/bot1820357869:AAHsqrZ4z2bqpKuCo7bhAqpr4iR1uo-nfT4/sendMessage?chat_id=1001685026&text=" + n1 + "/" + n2);
    } else {
        nomi1.innerText = "";
        nomi2.innerHTML = "";
        audio.setAttribute("src", "none");
        text.innerHTML = "Mavjud emas";
        textENG.innerHTML = "Not available";
        textRUS.innerHTML = "Недоступен";
    }
    loaded.style.display = "none";
});

send.addEventListener("click", () => {
    let comment = ism.value !== "" ? ism.value : "Anonim";
    if (textarea.value !== "") {
        comment += "👉🏻" + textarea.value;
        httpGet("https://api.telegram.org/bot1820357869:AAHsqrZ4z2bqpKuCo7bhAqpr4iR1uo-nfT4/sendMessage?chat_id=1001685026&text=" + comment);
        sent.style.display = "block";
        setTimeout(() => {sent.style.display = "none";}, 3000);
        ism.value = "";
        textarea.value = "";
    }
});