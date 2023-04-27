/* Le code ci-dessus est un script JavaScript qui exécute diverses fonctions sur une page Web. Il
inclut des écouteurs d'événements pour mouseenter et mouseleave sur les images, modifie l'image
d'arrière-plan d'une section toutes les 3 secondes, anime l'apparence des éléments lorsque
l'utilisateur fait défiler la page jusqu'à un certain point et gère les événements de soumission de
formulaire. Il inclut également des écouteurs d'événements pour mouseenter et mouseleave sur les
éléments de menu et ajuste la disposition et les styles des éléments en fonction de la largeur de la
fenêtre. */
document.addEventListener("DOMContentLoaded", () => {
  let image = document.querySelectorAll(".i"); //recuperation de toute les elements image avec la classe i
  const header = document.querySelector("header"); //recuperation de la section header
  const hiddenElement = document.getElementById("sec_nav"); // recuperatioin de la seconde bar de navigation
  const p = document.getElementById("i_plat");
  const _j = document.getElementById("_jour");
  const _n = document.getElementById("_nuit");
  let resizeTimer;
  /** application d'un style par defaut au moment ou la page est charge */
  document.getElementById("f_line").style.visibility = "hidden";
  document.getElementById("s_line").style.visibility = "hidden";
  document.getElementById("bbt").style.visibility = "hidden";

  /*
   *   regroupement des ecouturs d'evenements
   *
   *
   * */
  // changer la position du nav bar au moment que le haeder a disparu de l'ecran
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
        scale: 1.2,
        duration: 1000,
        easing: "easeOutQuad",
      });
    });

    // Ajouter un écouteur d'événement pour détecter le retrait de la souris de l'image
    img.addEventListener("mouseleave", () => {
      anime({
        targets: img,
        scale: 1,
        duration: 900,
        easing: "easeInOutQuad",
      });
    });
  });

  var section = document.getElementById("thnks");
  const elements = document.querySelectorAll(".h2");
  let _width = window.innerWidth;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionMiddle = sectionTop + sectionHeight / 2;

  // configuration de l'animation pour chaque élément enfant de la section
  elements.forEach((element, index) => {
    if (_width > 950) {
      element.style.transform = "translateX(200%)"; // définissez la position initiale de l'élément sur l'axe X en mode pc
      const animation = anime({
        targets: element,
        translateX: 0,
        duration: 1000,
        easing: "easeOutQuad",
        autoplay: false,
        delay: index * 500, // ajoutez un délai croissant à chaque élément
      });
      function handleScroll() {
        const scrollPosition = window.pageYOffset + window.innerHeight;
        if (scrollPosition > sectionMiddle) {
          animation.play();
          window.removeEventListener("scroll", handleScroll); // supprimez l'écouteur d'événement
        }
      }
    } else {
      element.style.transform = "translateY(200%)"; // définissez la position initiale de l'élément sur l'axe en affichage mobile
      const animation = anime({
        targets: element,
        translateY: 0,
        duration: 1000,
        easing: "easeOutQuad",
        autoplay: false,
        delay: index * 500, // ajoutez un délai croissant à chaque élément
      });
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

  window.addEventListener("resize", toggleEventListeners); // Call the function on window resize

  const f = document.getElementById("for_m");
  f.addEventListener("mouseenter", () => {
    document.getElementById("f_line").style.visibility = "visible";
    document.getElementById("s_line").style.visibility = "visible";
    document.getElementById("bbt").style.visibility = "visible";
    f.style.backgroundImage = "none";
    f.style.backgroundColor = "rgba(34, 33, 33, 0.309)";
  });

  //recuperation de certaine elements du dom
  const name = document.getElementById("name");
  const pname = document.getElementById("pname");
  const per = document.getElementById("per");
  const date = document.getElementById("date");
  const hr = document.getElementById("hr");
  const message = document.getElementById("message");

  //capture de l'evenement du formulaire
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

    message.scrollIntoView({ behavior: "smooth" }); // aller automatiquement dans la section contenant le message de confirmation apres reservation
  });

  /*
  
  regroupement des fonctions

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
      duration: 3500,
      opacity: 1,
      easing: "easeOutQuad",
      autoplay: true,
      complete: () => {
        const animations = anime({
          targets: dt,
          translateX: 410,
          duration: 1000,
          easing: "easeOutQuad",
          autoplay: true,
        });
      },
    });
  }
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
  function toggleEventListeners() {
    // suppression du premier timeOut s'il est deja existant
    clearTimeout(resizeTimer);

    // configuration d'un nouveau timeOut pour appeler la fonction apres une seconde
    resizeTimer = setTimeout(function () {
      let width_ = window.innerWidth;
      if (width_ > 950) {
        // ajout des ecouteurs d'evenements pour appliquer les styles
        _j.addEventListener("mouseenter", handleJourMouseEnter);
        _j.addEventListener("mouseleave", handleJourMouseLeave);
        _n.addEventListener("mouseenter", handleNuitMouseEnter);
        _n.addEventListener("mouseleave", handleNuitMouseLeave);
      } else {
        // suppression des ecouteurs d'evenements
        _j.removeEventListener("mouseenter", handleJourMouseEnter);
        _j.removeEventListener("mouseleave", handleJourMouseLeave);
        _n.removeEventListener("mouseenter", handleNuitMouseEnter);
        _n.removeEventListener("mouseleave", handleNuitMouseLeave);
      }
    }, 1000);
  }

  /**
   * appelle aux differentes fonctions
   */
  toggleEventListeners();
  getDateTime(); // recuperation et formatgae de la date
  setTimeout(makeItVisible, 3000); //definit un timer lors de l'appelle de la fonction mackeItVisible pour le message bienvenu
  setInterval(changeBackgroundImage, 3000); //changer l'image de fond de la section nos plats sur commande chaque 3 seconde
});
