document.addEventListener("DOMContentLoaded", () => {
  let image = document.querySelectorAll(".i"); // Récupérer l'élément image
  const header = document.querySelector("header");
  const hiddenElement = document.getElementById("sec_nav");
  const _f = document.getElementById("f_line");
  const _s = document.getElementById("s_line");
  const _b = document.getElementById("bbt");
  _f.style.visibility = "hidden";
  _s.style.visibility = "hidden";
  _b.style.visibility = "hidden";
  // changer l'affichage du nav bar
  window.addEventListener("scroll", () => {
    const headerPosition = header.getBoundingClientRect().bottom;
    if (headerPosition <= 0) {
      hiddenElement.style.visibility = "visible";
    } else {
      hiddenElement.style.visibility = "hidden";
    }
  });

  // Ajouter un écouteur d'événement pour détecter le passage de la souris sur l'image
  image.forEach((img) => {
    img.addEventListener("mouseenter", () => {
      anime({
        targets: img,
        scale: 1.2, // Zoomer l'image à 150% de sa taille d'origine
        duration: 1000, // La durée de l'animation en millisecondes
        easing: "easeOutQuad", // L'effet d'animation
      });
    });

    // Ajouter un écouteur d'événement pour détecter le retrait de la souris de l'image
    img.addEventListener("mouseleave", () => {
      anime({
        targets: img,
        scale: 1, // Remettre l'image à sa taille d'origine
        duration: 900, // La durée de l'animation en millisecondes
        easing: "easeInOutQuad", // L'effet d'animation
      });
    });
  });

  const p = document.getElementById("i_plat");
  function changeBackgroundImage() {
    $.ajax({
      url: "./assets/i_plat/", // chemin vers le répertoire d'images
      success: function (data) {
        const images = $(data)
          .find("a:contains(.jpg), a:contains(.png),a:contains(.webp)")
          .map(function () {
            return $(this).attr("href");
          })
          .get();

        // Sélectionne une image aléatoire dans le tableau
        const imageAleatoire =
          images[Math.floor(Math.random() * images.length)];
        // console.dir(imageAleatoire);

        // Anime la transition de l'image de fond
        anime({
          targets: p,
          duration: 1000,
          easing: "easeInOutQuad",
          scale: 1.1,
          complete: function () {
            p.classList.add("zoom");
            p.style.backgroundImage = `url(./assets/i_plat/${imageAleatoire})`;
            anime({
              targets: p,
              duration: 1000,
              easing: "easeInOutQuad",
              scale: 1,
              complete: function () {
                p.classList.remove("zoom");
              },
            });
          },
        });
      },
    });
  }

  // Change l'image de fond toutes les 3 secondes
  setInterval(changeBackgroundImage, 3000);

  var section = document.getElementById("thnks");
  const elements = document.querySelectorAll(".h2");
  // configurez l'animation pour chaque élément
  elements.forEach((element, index) => {
    // définissez la position initiale de l'élément
    element.style.transform = "translateX(200%)";
    // créez l'animation
    const animation = anime({
      targets: element,
      translateX: 0,
      duration: 1000,
      easing: "easeOutQuad",
      autoplay: false,
      delay: index * 500, // ajoutez un délai croissant à chaque élément
    });

    // déclenchez l'animation lorsque la section est visible à mi-page
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionMiddle = sectionTop + sectionHeight / 2;

    function handleScroll() {
      const scrollPosition = window.pageYOffset + window.innerHeight;
      if (scrollPosition > sectionMiddle) {
        animation.play();
        window.removeEventListener("scroll", handleScroll); // supprimez l'écouteur d'événement
      }
    }

    window.addEventListener("scroll", handleScroll);
  });

  // evenement sur les menue jour et nuit
  const _j = document.getElementById("_jour");
  const _n = document.getElementById("_nuit");
  _j.addEventListener("mouseenter", () => {
    document.getElementById("j_").style.fontSize = "50px";
    _j.style.width = "100%";
    _n.style.display = "none";
  });
  _j.addEventListener("mouseleave", () => {
    document.getElementById("j_").style.fontSize = "30px";
    _n.style.display = "block";
    _j.style.width = "50%";
  });

  _n.addEventListener("mouseenter", () => {
    document.getElementById("n_").style.fontSize = "50px";
    _n.style.width = "100%";
    _j.style.display = "none";
  });
  _n.addEventListener("mouseleave", () => {
    document.getElementById("n_").style.fontSize = "30px";
    _j.style.display = "block";
    _n.style.width = "50%";
  });

  const f = document.getElementById("for_m");
  f.addEventListener("mouseenter", () => {
    _f.style.visibility = "visible";
    _b.style.visibility = "visible";
    _s.style.visibility = "visible";
    f.style.backgroundImage = "none";
    f.style.backgroundColor = "rgba(34, 33, 33, 0.309)";
  });
  const name = document.getElementById("name");
  const pname = document.getElementById("pname");
  const per = document.getElementById("per");
  const date = document.getElementById("date");
  const hr = document.getElementById("hr");
  const message = document.getElementById("message");

  //capture de l'evenrment du formulaire
  document.getElementById("bbt").addEventListener("click", (event) => {
    // Empêcher la soumission par défaut du formulaire
    event.preventDefault();

    // Créer le message de confirmation ou d'annulation en fonction de l'état de la réservation
    const names = name.value;
    const pnames = pname.value;
    const pers = per.value;
    const dates = date.value;
    const hrs = hr.value;
    const d = ["acceptée", "rejetée"];
    const c = ["Félicitations", "Désolé"];
    const _t = ["Message de confirmation", "Message d'annulation"];
    const msg =
      c[0] +
      " " +
      names +
      " " +
      pnames +
      ", votre réservation d'une table pour " +
      pers +
      " a la date " +
      dates +
      " à " +
      hrs +
      " a été " +
      d[0] +
      ".";

    // Afficher le message dans la section "message"
    const typeOfMsgElement = document.getElementById("type_of_msg");
    const textMsgElement = document.getElementById("text_msg");
    typeOfMsgElement.innerHTML = _t[0];
    textMsgElement.innerHTML = msg;
    message.classList.add("msg");

    // Faire défiler la section "message" dans la vue
    message.scrollIntoView({ behavior: "smooth" });
  });
});
