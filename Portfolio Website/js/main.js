document.addEventListener('DOMContentLoaded', () => {
    // Essential DOM Elements
    const navbar = document.querySelector(".navbar");
    const filterButtons = document.querySelectorAll(".portfolio-filter");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const sections = document.querySelectorAll("section[id]");
    const contactSocial = document.querySelector(".contact-social .header-social");

    /*===== Sticky Navbar =====*/
    window.addEventListener("scroll", () => {
        if (navbar) {
            navbar.classList.toggle("sticky", window.scrollY > 20);
        }
    });

    /*===== Active Section Highlighting =====*/
    const highlightActiveSection = () => {
        const scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 50;
            const sectionId = section.getAttribute("id");
            const sectionLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (sectionLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionLink.classList.add("active");
                } else {
                    sectionLink.classList.remove("active");
                }
            }
        });
    };

    window.addEventListener("scroll", highlightActiveSection);

    /*===== Portfolio Filtering System =====*/
    class PortfolioFilter {
        constructor(filterButtons, portfolioItems) {
            this.filterButtons = filterButtons;
            this.portfolioItems = portfolioItems;
            this.currentFilter = 'all';
            this.initializeFilter();
        }

        initializeFilter() {
            this.showAllItems();

            this.filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const filterValue = button.getAttribute('data-filter');
                    this.currentFilter = filterValue;

                    this.filterItems(filterValue);
                });
            });
        }

        showAllItems() {
            this.portfolioItems.forEach(item => this.showItem(item));
        }

        filterItems(filterValue) {
            this.portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                filterValue === 'all' || itemCategory === filterValue
                    ? this.showItem(item)
                    : this.hideItem(item);
            });
        }

        showItem(item) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        }

        hideItem(item) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    }

    /*===== Smooth Scroll Implementation =====*/
    class SmoothScroll {
        constructor() {
            this.initializeSmoothScroll();
        }

        initializeSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', this.handleSmoothScroll);
            });
        }

        handleSmoothScroll(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }

    // Initialize Portfolio Filter
    new PortfolioFilter(filterButtons, portfolioItems);

    // Initialize Smooth Scroll
    new SmoothScroll();

    /*===== Portfolio Item Hover Effects =====*/
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.item-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                const title = overlay.querySelector('h4');
                if (title) {
                    title.style.transform = 'translateY(0)';
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.item-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                const title = overlay.querySelector('h4');
                if (title) {
                    title.style.transform = 'translateY(20px)';
                }
            }
        });
    });

    /*===== Social Media Icons in Contact Section =====*/
    if (contactSocial) {
        const socialMediaLinks = [
            { platform: "GitHub", icon: "fab fa-github", url: "https://github.com/s-k-d" },
            { platform: "Quora", icon: "fab fa-quora", url: "https://www.quora.com/profile/SKD-86" },
            { platform: "Twitter", icon: "fab fa-twitter", url: "https://x.com/SKD_real" },
            { platform: "LinkedIn", icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/shivanshdogra/" }
        ];

        socialMediaLinks.forEach(({ icon, url }) => {
            const listItem = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.target = "_blank";
            anchor.innerHTML = `<i class="${icon}"></i>`;
            listItem.appendChild(anchor);
            contactSocial.appendChild(listItem);
        });
    }
});
