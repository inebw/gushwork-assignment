import "./styles.css";
import prodImg from "./assets/product-img.png";
import prodImg1 from "./assets/product-img-1.jpg";
import prodImg2 from "./assets/product-img-2.jpg";

function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);

  lens = document.createElement("DIV");
  lens.setAttribute("class", "zoom-box");
  lens.classList.add("hide");
  result.classList.add("hide");

  img.parentElement.insertBefore(lens, img);

  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;

  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";

  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);

  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);

  function moveLens(e) {
    var pos, x, y;
    result.classList.remove("hide");
    lens.classList.remove("hide");

    e.preventDefault();

    pos = getCursorPos(e);

    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;

    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    lens.style.left = x + "px";
    lens.style.top = y + "px";

    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";

    lens.addEventListener("mouseout", () => {
      lens.classList.add("hide");
      result.classList.add("hide");
    });
    img.addEventListener("mouseout", () => {
      lens.classList.add("hide");
      result.classList.add("hide");
    });
  }

  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;

    a = img.getBoundingClientRect();

    x = e.pageX - a.left;
    y = e.pageY - a.top;

    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  imageZoom("myimage", "myresult");

  const imageUrls = [prodImg, prodImg1, prodImg2, prodImg, prodImg1, prodImg2];

  let currentIndex = 0;
  const mainImage = document.getElementById("myimage");
  const resultBox = document.getElementById("myresult");
  const prevBtn = document.querySelector(".left.arrow");
  const nextBtn = document.querySelector(".right.arrow");
  const thumbnails = document.querySelectorAll(".thumbnail");

  const updateCarousel = (index) => {
    if (index < 0) {
      currentIndex = imageUrls.length - 1;
    } else if (index >= imageUrls.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const newSrc = imageUrls[currentIndex];

    mainImage.src = newSrc;

    mainImage.style.backgroundImage = `url('${newSrc}')`;

    if (resultBox) {
      resultBox.style.backgroundImage = `url('${newSrc}')`;
    }

    thumbnails.forEach((thumb, i) => {
      if (i === currentIndex) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
      }
    });
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => updateCarousel(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => updateCarousel(currentIndex + 1));
  }

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const clickedIndex = parseInt(thumb.getAttribute("data-index"));
      updateCarousel(clickedIndex);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const leftBtn = document.querySelector(".left-arrow-btn");
  const rightBtn = document.querySelector(".right-arrow-btn");

  let currentScrollPosition = 0;

  const moveCarousel = (direction) => {
    const card = document.querySelector(".app-card");
    const scrollAmount = card.offsetWidth + 24;

    const maxScroll = track.scrollWidth - track.parentElement.clientWidth;

    if (direction === "right") {
      currentScrollPosition += scrollAmount;
      if (currentScrollPosition > maxScroll) {
        currentScrollPosition = maxScroll;
      }
    } else if (direction === "left") {
      currentScrollPosition -= scrollAmount;
      if (currentScrollPosition < 0) {
        currentScrollPosition = 0;
      }
    }

    track.style.transform = `translateX(-${currentScrollPosition}px)`;
  };

  rightBtn.addEventListener("click", () => moveCarousel("right"));
  leftBtn.addEventListener("click", () => moveCarousel("left"));
});

document.addEventListener("DOMContentLoaded", () => {
  const stepButtons = document.querySelectorAll(".mfg-step-btn");
  const contentWrapper = document.querySelector(".mfg-step-content-wrapper");
  const prevArrow = document.querySelector(".mfg-prev");
  const nextArrow = document.querySelector(".mfg-next");

  let activeStepNum = 1;
  const totalSteps = stepButtons.length;

  const activateStep = (stepNumber) => {
    const targetStep = parseInt(stepNumber);

    stepButtons.forEach((btn) => {
      if (btn.getAttribute("data-step") == targetStep) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    contentWrapper.classList.add("fading");

    setTimeout(() => {
      contentWrapper.classList.remove(`active-step-${activeStepNum}`);
      contentWrapper.classList.add(`active-step-${targetStep}`);
      activeStepNum = targetStep;
      contentWrapper.classList.remove("fading");
    }, 150);
  };

  stepButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const stepToActivate = e.target.getAttribute("data-step");
      activateStep(stepToActivate);
    });
  });

  nextArrow.addEventListener("click", () => {
    let nextStep = activeStepNum + 1;
    if (nextStep > totalSteps) {
      nextStep = 1;
    }
    activateStep(nextStep);
  });

  prevArrow.addEventListener("click", () => {
    let prevStep = activeStepNum - 1;
    if (prevStep < 1) {
      prevStep = totalSteps;
    }
    activateStep(prevStep);
  });
});

const stickyBar = document.getElementById("stickyBar");
const triggerPoint = document.querySelector(".product-main").offsetHeight;

window.addEventListener("scroll", () => {
  if (window.scrollY > triggerPoint) {
    stickyBar.classList.add("show");
  } else {
    stickyBar.classList.remove("show");
  }
});

const modal = document.getElementById("quoteModal");
const closeBtn = document.getElementById("closeModal");

const quoteButtons = document.querySelectorAll(".qt-btn");

quoteButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

const quoteModal = document.getElementById("quoteModal");
const quoteBtns = document.querySelectorAll(".quote-btn");
const closeQuote = document.getElementById("closeModal");

quoteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    quoteModal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});

closeQuote.addEventListener("click", () => {
  quoteModal.classList.remove("active");
  document.body.classList.remove("modal-open");
});

const downloadModal = document.getElementById("downloadModal");
const downloadBtns = document.querySelectorAll(".download-btn");
const closeDownload = document.getElementById("closeDownloadModal");

downloadBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    downloadModal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});

closeDownload.addEventListener("click", () => {
  downloadModal.classList.remove("active");
  document.body.classList.remove("modal-open");
});

[quoteModal, downloadModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const stepButtons = document.querySelectorAll(".mfg-step-btn");
  const contentWrapper = document.querySelector(".mfg-step-content-wrapper");

  const prevArrows = document.querySelectorAll(".mfg-prev, .mobile-prev");
  const nextArrows = document.querySelectorAll(".mfg-next, .mobile-next");
  const mobileBadge = document.getElementById("mobile-step-badge");

  let activeStepNum = 1;
  const totalSteps = stepButtons.length;

  const stepNames = [
    "Raw Material",
    "Extrusion",
    "Cooling",
    "Sizing",
    "Quality Control",
    "Marking",
    "Cutting",
    "Packaging",
  ];

  const activateStep = (stepNumber) => {
    const targetStep = parseInt(stepNumber);

    stepButtons.forEach((btn) => {
      if (btn.getAttribute("data-step") == targetStep) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (mobileBadge) {
      mobileBadge.textContent = `Step ${targetStep}/${totalSteps}: ${stepNames[targetStep - 1]}`;
    }

    contentWrapper.classList.add("fading");

    setTimeout(() => {
      contentWrapper.classList.remove(`active-step-${activeStepNum}`);
      contentWrapper.classList.add(`active-step-${targetStep}`);
      activeStepNum = targetStep;
      contentWrapper.classList.remove("fading");
    }, 150);
  };

  stepButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const stepToActivate = e.target.getAttribute("data-step");
      activateStep(stepToActivate);
    });
  });

  nextArrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      let nextStep = activeStepNum + 1;
      if (nextStep > totalSteps) nextStep = 1;
      activateStep(nextStep);
    });
  });

  prevArrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      let prevStep = activeStepNum - 1;
      if (prevStep < 1) prevStep = totalSteps;
      activateStep(prevStep);
    });
  });
});
