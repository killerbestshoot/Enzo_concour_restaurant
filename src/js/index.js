/* Le code ci-dessus est un script JavaScript qui exécute diverses fonctions sur une page Web. Il
inclut des écouteurs d'événements pour mouseenter et mouseleave sur les images, modifie l'image
d'arrière-plan d'une section toutes les 3 secondes, anime l'apparence des éléments lorsque
l'utilisateur fait défiler la page jusqu'à un certain point et gère les événements de soumission de
formulaire. Il inclut également des écouteurs d'événements pour mouseenter et mouseleave sur les
éléments de menu et ajuste la disposition et les styles des éléments en fonction de la largeur de la
fenêtre. */
document.addEventListener("DOMContentLoaded", () => {
  getDateTime();
  setTimeout(makeItVisible, 3000);
  // makeItVisible();
  let image = document.querySelectorAll(".i"); // Récupérer l'élément image
  const header = document.querySelector("header");
  const hiddenElement = document.getElementById("sec_nav");
  document.getElementById("f_line").style.visibility = "hidden";
  document.getElementById("s_line").style.visibility = "hidden";
  document.getElementById("bbt").style.visibility = "hidden";

  /**
   * La fonction obtient la date et l'heure actuelles au format français et affiche un message
   * d'accueil et de bienvenue sur une page Web.
   */
  function getDateTime() {
    let date = new Date();
    let jour = date.toLocaleString("fr-FR", { weekday: "long" });
    let month = date.toLocaleString("fr-FR", { month: "long" });
    let heure = date.toLocaleString("fr-FR", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let minutes = date.getMinutes();

    if (date.getHours() >= 5 && date.getHours() < 18) {
      document.getElementById("salutation").innerHTML = "Bonjour";
    } else {
      document.getElementById("salutation").innerHTML = "Bonsoir";
    }

    document.getElementById("welcomtxt").innerHTML =
      "Aujourd'hui, nous sommes " +
      jour +
      " " +
      date.getDate() +
      " " +
      month +
      " et il est " +
      heure;
  }
  function makeItVisible() {
    const dt = document.getElementById("dateTime");
    const animation = anime({
      targets: dt,
      translateX: 0,
      duration: 2500,
      easing: "easeOutQuad",
      autoplay: true,
      complete: () => {
        const animations = anime({
          targets: dt,
          translateX: 100,
          duration: 2500,
          easing: "easeOutQuad",
          autoplay: true,
        });
      },
    });
  }

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
          .find(
            "a:contains(.jpg), a:contains(.png),a:contains(.webp),a:contains(.jpeg)"
          )
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
  let _width = window.innerWidth;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionMiddle = sectionTop + sectionHeight / 2;

  // configurez l'animation pour chaque élément
  elements.forEach((element, index) => {
    if (_width > 950) {
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
      function handleScroll() {
        const scrollPosition = window.pageYOffset + window.innerHeight;
        if (scrollPosition > sectionMiddle) {
          animation.play();
          window.removeEventListener("scroll", handleScroll); // supprimez l'écouteur d'événement
        }
      }
    } else {
      // définissez la position initiale de l'élément
      element.style.transform = "translateY(200%)";
      // créez l'animation
      const animation = anime({
        targets: element,
        translateY: 0,
        duration: 1000,
        easing: "easeOutQuad",
        autoplay: false,
        delay: index * 500, // ajoutez un délai croissant à chaque élément
      });

      // déclenchez l'animation lorsque la section est visible à mi-page
      function handleScroll() {
        const scrollPosition = window.pageYOffset + window.innerHeight;
        if (scrollPosition > sectionMiddle) {
          animation.play();
          window.removeEventListener("scroll", handleScroll); // supprimez l'écouteur d'événement
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
  });

  // evenement sur les menue jour et nuit
  const _j = document.getElementById("_jour");
  const _n = document.getElementById("_nuit");
  let resizeTimer;

  // Define the event handler functions
  function handleJourMouseEnter() {
    setTimeout(() => {
      document.getElementById("j_").style.fontSize = "50px";
      _j.style.width = "100%";
      _n.style.display = "none";
    }, 900);
  }

  function handleJourMouseLeave() {
    setTimeout(() => {
      document.getElementById("j_").style.fontSize = "30px";
      _n.style.display = "block";
      _j.style.width = "50%";
    }, 400);
  }

  function handleNuitMouseEnter() {
    setTimeout(() => {
      document.getElementById("n_").style.fontSize = "50px";
      _n.style.width = "100%";
      _j.style.display = "none";
    }, 900);
  }

  function handleNuitMouseLeave() {
    setTimeout(() => {
      document.getElementById("n_").style.fontSize = "30px";
      _j.style.display = "block";
      _n.style.width = "50%";
    }, 400);
  }

  function toggleEventListeners() {
    // Clear the previous timeout if it exists
    clearTimeout(resizeTimer);

    // Set a new timeout to call the function after 250ms
    resizeTimer = setTimeout(function () {
      let width_ = window.innerWidth;
      if (width_ > 950) {
        // add event listeners and modify element styles
        _j.addEventListener("mouseenter", handleJourMouseEnter);
        _j.addEventListener("mouseleave", handleJourMouseLeave);
        _n.addEventListener("mouseenter", handleNuitMouseEnter);
        _n.addEventListener("mouseleave", handleNuitMouseLeave);
      } else {
        // remove event listeners and modify element styles
        _j.removeEventListener("mouseenter", handleJourMouseEnter);
        _j.removeEventListener("mouseleave", handleJourMouseLeave);
        _n.removeEventListener("mouseenter", handleNuitMouseEnter);
        _n.removeEventListener("mouseleave", handleNuitMouseLeave);
      }
    }, 1000);
  }

  // Call the function on page load
  toggleEventListeners();

  // Call the function on window resize
  window.addEventListener("resize", toggleEventListeners);

  const f = document.getElementById("for_m");
  f.addEventListener("mouseenter", () => {
    document.getElementById("f_line").style.visibility = "visible";
    document.getElementById("s_line").style.visibility = "visible";
    document.getElementById("bbt").style.visibility = "visible";
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
