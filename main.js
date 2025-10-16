                // Scroll Animation Observer
                const observerOptions = {
                  threshold: 0.1,
                  rootMargin: '0px 0px -100px 0px'
                };
                
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                      setTimeout(() => {
                        entry.target.classList.add('visible');
                      }, index * 100);
                    }
                  });
                }, observerOptions);
                
                // Observe all animated elements
                document.querySelectorAll('.glass-card, .rule-card, .feature-card, .stat-card, .team-member').forEach(el => {
                  observer.observe(el);
                });
                
                // Slideshow functionality
                let currentSlideIndex = 0;
                const slides = document.querySelectorAll('.slide');
                const dots = document.querySelectorAll('.nav-dot');
                
                function showSlide(index) {
                  slides.forEach(slide => slide.classList.remove('active'));
                  dots.forEach(dot => dot.classList.remove('active'));
                  
                  if (index >= slides.length) {
                    currentSlideIndex = 0;
                  } else if (index < 0) {
                    currentSlideIndex = slides.length - 1;
                  } else {
                    currentSlideIndex = index;
                  }
                  
                  slides[currentSlideIndex].classList.add('active');
                  dots[currentSlideIndex].classList.add('active');
                }
                
                function changeSlide(direction) {
                  showSlide(currentSlideIndex + direction);
                }
                
                function currentSlide(index) {
                  showSlide(index);
                }
                
                // Auto-advance slideshow every 5 seconds
                setInterval(() => {
                  changeSlide(1);
                }, 5000);
                
                // Smooth scroll reveal for stats
                const statCards = document.querySelectorAll('.stat-card');
                let statsAnimated = false;
                
                window.addEventListener('scroll', () => {
                  if (!statsAnimated) {
                    statCards.forEach((card, index) => {
                      const rect = card.getBoundingClientRect();
                      if (rect.top < window.innerHeight * 0.8) {
                        setTimeout(() => {
                          card.classList.add('visible');
                          // Animate numbers
                          const statNumber = card.querySelector('.stat-number');
                          const finalValue = statNumber.textContent;
                          if (finalValue.includes('+')) {
                            const num = parseInt(finalValue);
                            let current = 0;
                            const increment = num / 50;
                            const timer = setInterval(() => {
                              current += increment;
                              if (current >= num) {
                                statNumber.textContent = finalValue;
                                clearInterval(timer);
                              } else {
                                statNumber.textContent = Math.floor(current) + '+';
                              }
                            }, 30);
                          }
                        }, index * 150);
                        statsAnimated = true;
                      }
                    });
                  }
                });
                
                // Add ripple effect to buttons
                document.querySelectorAll('.cta-button').forEach(button => {
                  button.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => ripple.remove(), 600);
                  });
                });