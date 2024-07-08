// ! Onyüze Gorev Ekletmek için;

const searchInput = document.querySelector("#searchInput");
const btnEkle = document.querySelector("#btnEkle");
const ul = document.querySelector("#todoListesi");
const btnTemizle = document.querySelector("#btnTemizle");
const searchFilter = document.querySelector("#searchFilter");

//! Local storagedan verileri alıp ekrana yazirmak
const gorevleriEkranaEkle = () => {
    ul.innerHTML = "";

    let gorevler = JSON.parse(localStorage.getItem("todoListesi")) || [];

    // ! Herbir gorev icin bir li lusturup bunlari ul icine ekleyelim
    gorevler.forEach(function(gorev){
        ul.innerHTML +=
            ` <li class="list-item list-unstyled border border-bottom p-2 my-2">${gorev}
            <i class="fa-regular fa-circle-xmark float-end mt-2"></i>
        </li>`

    })
}


const onYüzeEkle = () => {
    let searchText = searchInput.value;
    // console.log(searchText);

    if (searchText.trim().length != 0) {
        let gorevler = JSON.parse(localStorage.getItem("todoListesi")) || [];
        gorevler.push(searchText)

        //  ! Gorevlerin eklenmis halinin local strorage a kaydedilmesi
        localStorage.setItem("todoListesi", JSON.stringify(gorevler))
        gorevleriEkranaEkle();


        searchInput.value = "";

    } else {
        alert("The task section cannot be left empty!")
    }


}

// ! sayfa yuklendiginde localdaki elemenları sayfaya bastirmak icin

document.addEventListener("DOMContentLoaded", gorevleriEkranaEkle)

btnEkle.addEventListener("click", onYüzeEkle)

searchInput.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        onYüzeEkle()
    }
})

// ! Tiklanan elemani sildirmek icin;

const onYüzdenSil = (e) => {
    //  console.log(e.target);
    const li = e.target.parentElement;
    if (e.target.className.includes("fa-regular")) {
        li.style.display = "none";
    }

    //! Silinen elemanı local storage dan da silmek icin
    let gorevler = JSON.parse(localStorage.getItem("todoListesi")) || [];
    let gorevIndex = gorevler.indexOf(li.textContent.trim());
    if(gorevIndex != -1){
        gorevler.splice(gorevIndex,1)
        localStorage.setItem("todoListesi", JSON.stringify(gorevler))
    }
}

ul.addEventListener("click", onYüzdenSil)

// ! Temizle butonuna basildiginda tüm icerik temizlensin

btnTemizle.addEventListener("click", function () {
    localStorage.removeItem("todoListesi");
    ul.innerHTML = "";
})

// ! Gorevleri filtrelemek için;



const filtrele = () => {
    let filtreliDurum = searchFilter.value;

    let gorevler = document.querySelectorAll("ul .list-item");

    gorevler.forEach((gorev) => {
        if(gorev.textContent.startsWith(filtreliDurum)){
            gorev.style.display = "block";
        }else{
            gorev.style.display = "none";
        }
    })
}

searchFilter.addEventListener("input", filtrele);