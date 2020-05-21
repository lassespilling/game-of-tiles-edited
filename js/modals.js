// Modals
const Modal = {};
Modal.openBtn = document.querySelectorAll("[data-modal-open]"); // Btns that open modal
Modal.closeBtn = document.querySelectorAll("[data-modal-close]"); // Btns that close modal
Modal.append = function(container, element) {
    // Append function for standard elements
    let contentContainer = document.querySelector(container);
    contentContainer.appendChild(element);
};

// Hide and show modal functions
Modal.hide = function(modalid) {
    modalid = document.getElementById(modalid);
    if (modalid.classList.contains("modal--open")) {
        modalid.classList.add("modal--closed");
        modalid.classList.remove("modal--open");
        modalid.querySelector(".modal__content").innerHTML = "";
    }
};
Modal.show = function(modalid) {
    modalid = document.getElementById(modalid);
    if (modalid.classList.contains("modal--closed")) {
        modalid.classList.add("modal--open");
        modalid.classList.remove("modal--closed");
    }
};
Modal.hideAll = function() {
    for (i = 0; i < Modal.container.length; i++) {
        if (Modal.container[i].classList.contains("modal--open")) {
            Modal.container[i].classList.remove("modal--open");
            Modal.container[i].classList.add("modal--closed");
        }
    }
};

// Create click events for modal buttons
// Modal to toggle by data tag
for (i = 0; i < Modal.openBtn.length; i++) {
    Modal.openBtn[i].addEventListener("click", function(e) {
        let modalId = this.getAttribute("data-modal-open"); // Get modal Id from btn
        let modalToToggle = document.getElementById(modalId); // Find dom element
        if (modalToToggle.classList.contains("modal--closed")) {
            modalToToggle.classList.add("modal--open");
            modalToToggle.classList.remove("modal--closed");
        }
        e.stopPropagation;
    });
}

// Modal to close by data tag
for (i = 0; i < Modal.closeBtn.length; i++) {
    Modal.closeBtn[i].addEventListener("click", function(e) {
        let modalIdArray = this.getAttribute("data-modal-close").split(", "); // Get modal Id from btn
        let modalReplace = document.querySelectorAll(".modal--replace");
        for (x = 0; x < modalIdArray.length; x++) {
            if (
                document
                    .getElementById(modalIdArray[x])
                    .classList.contains("modal--open")
            ) {
                document
                    .getElementById(modalIdArray[x])
                    .classList.add("modal--closed");
                document
                    .getElementById(modalIdArray[x])
                    .classList.remove("modal--open");
                document
                    .getElementById(modalIdArray[x])
                    .classList.remove("modal--open");
            }
        }
        for (y = 0; y < modalReplace.length; y++) {
            modalReplace[y].querySelector(".modal__content").innerHTML = "";
        }
        e.stopPropagation;
    });
}

window.addEventListener("load", function() {
    document.body.classList.add("loaded");
    document.getElementById("welcomeModal").classList.remove("modal--closed");
    document.getElementById("welcomeModal").classList.add("modal--open");
    setTimeout( function() {
        document.getElementById('loadPage').style.opacity = 1;
    },1000);
});
