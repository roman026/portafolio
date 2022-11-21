const bar = document.querySelector(".fa-bars");
const menu = document.querySelector(".menu__list");

bar.addEventListener("click", () => {
  menu.classList.toggle("show-menu");
});

const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {
  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }
});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

/* scroll top */

const d = document,
  w = window;

function scrollTopButton() {
  const $scrollBtn = d.querySelector(".scroll-top-btn");

  console.log($scrollBtn);

  w.addEventListener("scroll", (e) => {
    let scrollTop = w.pageYOffset || d.documentElement.scrollTop;

    if (scrollTop > 400) {
      $scrollBtn.classList.remove("hidden");
    } else {
      $scrollBtn.classList.add("hidden");
    }
    /* console.log(w.pageYOffset, d.documentElement.scrollTop); */
  });

  d.addEventListener("click", (e) => {
    if (e.target.matches(".scroll-top-btn")) {
      w.scrollTo({
        bahavior: "smooth",
        top: 0,
      });
    }
  });
}
scrollTopButton();

/* Validar Formulario */

function contactFormValidation() {
  const $form = d.querySelector(".formcontato__form"),
    $mensaje = d.querySelector(".form__wrapper"),
    $inputs = d.querySelectorAll(".formcontato__form [required]");

  // console.log($inputs);

  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;

    $span.textContent = input.title;
    $span.classList.add("formcontato__form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".formcontato__form [required]")) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;
      //console.log($input, pattern);
      if (pattern /* && $input.value !== "" */) {
        //console.log("el input tiene patron");
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }

      if (!pattern) {
        // console.log("el input no tiene patron");
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();

    const $loader = d.querySelector(".formcontato__form-loader"),
      $response = d.querySelector(".formcontato__form-response");

    $loader.classList.remove("none");

    setTimeout(() => {
      $loader.classList.add("none");
      $response.classList.remove("none");
      $form.reset();

      setTimeout(() => $response.classList.add("none"), 3000);
    }, 3000);
  });
}
contactFormValidation();
