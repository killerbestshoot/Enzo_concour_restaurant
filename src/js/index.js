document.addEventListener("DOMContentLoaded", () => {
  let image = document.querySelectorAll(".i"); // Récupérer l'élément image
  const header = document.querySelector("header");
  const hiddenElement = document.getElementById("sec_nav");

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
        easing: "easeOutQuad", // L'effet d'animation
      });
    });
  });
  // récupérez la section et les éléments que vous voulez animer
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
  const f = document.getElementById("for_m");
  f.addEventListener("mouseenter", () => {
    console.log(fm);

    f.style.backgroundImage = "none";
    f.style.backgroundColor = "rgba(34, 33, 33, 0.309)";
  });
  const name = document.getElementById("name");
  const pname = document.getElementById("pname");
  const per = document.getElementById("per");
  const date = document.getElementById("date");
  const hr = document.getElementById("hr");
  const message = document.getElementById("message");
  document.getElementById("bbt").addEventListener("click", () => {
    message.classList.add("msg");
    const c = Array[("Felicitation", "Desolee")];
    const d = Array[("accepter", "rejeter")];
    const names = name.value;
    const pnames = pname.value;
    const pers = pers.value;
    const dates = date.value;
    const hrs = hr.value;
    var msgs =
      c[0] +
      "" +
      names +
      " " +
      pnames +
      " votre reservation pour la date " +
      dates +
      " a " +
      hrs +
      " est " +
      c[1] +
      ".";
    document.getElementById("text_msg").innerHTML += msgs;
  });
});
