// Client-side initializers for pages using ClientRouter view transitions.
// Keeps interactive features working after client-side navigation.
(function () {
  function initPortfolioLightbox() {
    var lightbox = document.getElementById('portfolio-lightbox');
    if (!lightbox) return false;

    if (!window._lightboxHandlers) {
      window._lightboxHandlers = { keyboard: null, cardClick: null, cardKeydown: null };
    }

    function cleanupLightbox() {
      if (window._lightboxHandlers.keyboard) {
        document.removeEventListener('keydown', window._lightboxHandlers.keyboard);
        window._lightboxHandlers.keyboard = null;
      }
      if (window._lightboxHandlers.cardKeydown) {
        document.removeEventListener('keydown', window._lightboxHandlers.cardKeydown);
        window._lightboxHandlers.cardKeydown = null;
      }
      if (window._lightboxHandlers.cardClick) {
        document.removeEventListener('click', window._lightboxHandlers.cardClick);
        document.removeEventListener('pointerdown', window._lightboxHandlers.cardClick);
        window._lightboxHandlers.cardClick = null;
      }
      if (lightbox.classList.contains('is-open')) {
        document.body.classList.remove('lightbox-open');
      }
    }

    function getCards() {
      return Array.from(document.querySelectorAll('[data-portfolio-card]'));
    }

    var cards = getCards();
    if (cards.length === 0) return false;

    cleanupLightbox();

    var currentIndex = 0;
    var previouslyFocusedElement = null;

    function isOpen() {
      return lightbox.classList.contains('is-open');
    }

    function updateContent() {
      var currentCards = getCards();
      var card = currentCards[currentIndex];
      if (!card) return;

      var title = card.dataset.title || '';
      var industry = card.dataset.industry || '';
      var description = card.dataset.description || '';
      var image = card.dataset.image || '';
      var liveUrl = card.dataset.liveUrl || '';
      var loadTime = card.dataset.loadTime || '';
      var mobileScore = card.dataset.mobileScore || '';
      var conversionRate = card.dataset.conversionRate || '';
      var techStack = card.dataset.techStack || '';

      var imgEl = document.getElementById('lightbox-image');
      if (imgEl) {
        imgEl.src = image;
        imgEl.alt = title + ' website screenshot';
      }

      var titleEl = document.getElementById('lightbox-title');
      if (titleEl) titleEl.textContent = title;

      var industryEl = document.getElementById('lightbox-industry');
      if (industryEl) industryEl.textContent = industry;

      var descEl = document.getElementById('lightbox-description');
      if (descEl) descEl.textContent = description;

      var speedMetric = document.getElementById('lightbox-metric-speed');
      var mobileMetric = document.getElementById('lightbox-metric-mobile');
      var conversionMetric = document.getElementById('lightbox-metric-conversion');

      if (speedMetric) {
        if (loadTime) {
          speedMetric.classList.remove('hidden');
          var speedValue = document.getElementById('lightbox-speed-value');
          if (speedValue) speedValue.textContent = loadTime;
        } else {
          speedMetric.classList.add('hidden');
        }
      }

      if (mobileMetric) {
        if (mobileScore) {
          mobileMetric.classList.remove('hidden');
          var mobileValue = document.getElementById('lightbox-mobile-value');
          if (mobileValue) mobileValue.textContent = mobileScore + '/100';
        } else {
          mobileMetric.classList.add('hidden');
        }
      }

      if (conversionMetric) {
        if (conversionRate) {
          conversionMetric.classList.remove('hidden');
          var conversionValue = document.getElementById('lightbox-conversion-value');
          if (conversionValue) conversionValue.textContent = conversionRate;
        } else {
          conversionMetric.classList.add('hidden');
        }
      }

      var techContainer = document.getElementById('lightbox-tech-container');
      var techStackEl = document.getElementById('lightbox-tech-stack');

      if (techContainer && techStackEl) {
        if (techStack) {
          techContainer.classList.remove('hidden');
          techStackEl.innerHTML = techStack
            .split(',')
            .filter(Boolean)
            .map(function (tech) {
              return '<span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">' + tech.trim() + '</span>';
            })
            .join('');
        } else {
          techContainer.classList.add('hidden');
        }
      }

      var visitBtn = document.getElementById('lightbox-visit');
      if (visitBtn) {
        if (liveUrl && liveUrl !== '#') {
          visitBtn.classList.remove('hidden');
          visitBtn.href = liveUrl;
        } else {
          visitBtn.classList.add('hidden');
        }
      }
    }

    function open(index) {
      currentIndex = index;
      previouslyFocusedElement = document.activeElement;

      updateContent();

      lightbox.classList.remove('hidden');
      lightbox.offsetHeight;
      lightbox.classList.add('is-open');
      document.body.classList.add('lightbox-open');

      var closeBtn = lightbox.querySelector('[data-lightbox-close]');
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');

      setTimeout(function () {
        lightbox.classList.add('hidden');
      }, 300);

      if (previouslyFocusedElement) previouslyFocusedElement.focus();
    }

    function prev() {
      var currentCards = getCards();
      currentIndex = currentIndex === 0 ? currentCards.length - 1 : currentIndex - 1;
      updateContent();
    }

    function next() {
      var currentCards = getCards();
      currentIndex = currentIndex === currentCards.length - 1 ? 0 : currentIndex + 1;
      updateContent();
    }

    window._lightboxHandlers.cardClick = function (e) {
      if (e.target.closest && e.target.closest('a[target="_blank"]')) return;

      var enlargeBtn = e.target.closest('[data-enlarge-btn]');
      if (enlargeBtn) {
        var card = enlargeBtn.closest('[data-portfolio-card]');
        if (card) {
          e.stopPropagation();
          var currentCards = getCards();
          var index = currentCards.indexOf(card);
          if (index !== -1) open(index);
        }
        return;
      }

      var card = e.target.closest('[data-portfolio-card]');
      if (card) {
        var currentCards = getCards();
        var index = currentCards.indexOf(card);
        if (index !== -1) open(index);
      }
    };
    document.addEventListener('click', window._lightboxHandlers.cardClick);

    window._lightboxHandlers.cardKeydown = function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (e.target && e.target.closest && e.target.closest('a')) return;

      var card = e.target && e.target.closest ? e.target.closest('[data-portfolio-card]') : null;
      if (card) {
        e.preventDefault();
        var currentCards = getCards();
        var index = currentCards.indexOf(card);
        if (index !== -1) open(index);
      }
    };
    document.addEventListener('keydown', window._lightboxHandlers.cardKeydown);

    lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        close();
      });
    });

    lightbox.querySelectorAll('[data-lightbox-prev]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        prev();
      });
    });

    lightbox.querySelectorAll('[data-lightbox-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        next();
      });
    });

    window._lightboxHandlers.keyboard = function (e) {
      if (!isOpen()) return;

      switch (e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowLeft':
          prev();
          break;
        case 'ArrowRight':
          next();
          break;
      }
    };
    document.addEventListener('keydown', window._lightboxHandlers.keyboard);

    var touchStartX = 0;
    var touchEndX = 0;

    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          next();
        } else {
          prev();
        }
      }
    }, { passive: true });

    return true;
  }

  function initContactForm() {
    var form = document.getElementById('contact-form-enhanced');
    if (!form || form.dataset.initialized === 'true') return false;
    form.dataset.initialized = 'true';

    var serviceRadios = document.querySelectorAll('input[name="service"]');
    if (serviceRadios.length === 0) return false;

    var seoFields = document.getElementById('seo-fields');
    var designFields = document.getElementById('design-fields');
    var websiteInput = document.getElementById('website');
    var businessTypeInput = document.getElementById('business_type');
    var subjectInput = document.getElementById('form-subject');
    var submitButton = document.getElementById('submit-button');
    var feedbackDiv = document.getElementById('form-feedback');

    var defaultSubmitText = submitButton ? submitButton.textContent : 'Get My Free Strategy Call \u2192';
    var selectedService = '';

    function updateConditionalFields(service) {
      selectedService = service;

      if (service === 'SEO') {
        if (seoFields) {
          seoFields.classList.remove('hidden');
          seoFields.setAttribute('aria-hidden', 'false');
        }
        if (designFields) {
          designFields.classList.add('hidden');
          designFields.setAttribute('aria-hidden', 'true');
        }
        if (websiteInput) websiteInput.required = true;
        if (businessTypeInput) businessTypeInput.required = false;
        if (subjectInput) subjectInput.value = 'New SEO Audit Request';
        if (submitButton) submitButton.textContent = 'Get My Free SEO Audit \u2192';
      } else if (service === 'Website Design') {
        if (designFields) {
          designFields.classList.remove('hidden');
          designFields.setAttribute('aria-hidden', 'false');
        }
        if (seoFields) {
          seoFields.classList.add('hidden');
          seoFields.setAttribute('aria-hidden', 'true');
        }
        if (websiteInput) websiteInput.required = false;
        if (businessTypeInput) businessTypeInput.required = true;
        if (subjectInput) subjectInput.value = 'New Website Design Inquiry';
        if (submitButton) submitButton.textContent = 'Get My Free Quote \u2192';
      }
    }

    serviceRadios.forEach(function (radio) {
      radio.addEventListener('change', function (e) {
        updateConditionalFields(e.target.value);
      });
    });

    var checkedRadio = document.querySelector('input[name="service"]:checked');
    if (checkedRadio) {
      updateConditionalFields(checkedRadio.value);
    }

    var ctaButton = document.querySelector('[href="#contact-form-enhanced"]');
    if (ctaButton) {
      ctaButton.addEventListener('click', function (e) {
        e.preventDefault();
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var firstRadio = form.querySelector('input[name="service"]');
        setTimeout(function () {
          if (firstRadio) firstRadio.focus();
        }, 500);
      });
    }

    if (feedbackDiv) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        var originalButtonText = submitButton ? submitButton.textContent : defaultSubmitText;

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
        }

        feedbackDiv.classList.add('hidden');

        try {
          var formData = new FormData(form);

          var websiteValue = formData.get('website');
          if (websiteValue && !websiteValue.match(/^https?:\/\//i)) {
            websiteValue = 'https://' + websiteValue;
            formData.set('website', websiteValue);
          }

          if (!websiteValue) formData.delete('website');
          var businessType = formData.get('business_type');
          if (!businessType) formData.delete('business_type');

          var response = await fetch('https://formspree.io/f/mdkyevdb', {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
          });

          if (response.ok) {
            var successMessage = selectedService === 'SEO'
              ? "We'll get back to you within 24 hours with your free SEO audit."
              : "We'll contact you within 24 hours to discuss your website design project.";

            feedbackDiv.className = 'mt-4 p-4 rounded-lg bg-green-50 border-2 border-green-200';
            feedbackDiv.innerHTML = '\n' +
              '                <div class="flex items-start">\n' +
              '                  <svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">\n' +
              '                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />\n' +
              '                  </svg>\n' +
              '                  <div>\n' +
              '                    <p class="font-semibold text-green-800">Thank you for your message!</p>\n' +
              '                    <p class="text-sm text-green-700 mt-1">' + successMessage + '</p>\n' +
              '                  </div>\n' +
              '                </div>\n' +
              '              ';
            feedbackDiv.classList.remove('hidden');

            form.reset();
            if (seoFields) {
              seoFields.classList.add('hidden');
              seoFields.setAttribute('aria-hidden', 'true');
            }
            if (designFields) {
              designFields.classList.add('hidden');
              designFields.setAttribute('aria-hidden', 'true');
            }
            if (websiteInput) websiteInput.required = false;
            if (businessTypeInput) businessTypeInput.required = false;
            if (submitButton) submitButton.textContent = defaultSubmitText;
            selectedService = '';

            feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            setTimeout(function () {
              feedbackDiv.classList.add('hidden');
            }, 10000);
          } else {
            var errorData = await response.json();
            throw new Error(errorData.error || 'Form submission failed');
          }
        } catch (error) {
          feedbackDiv.className = 'mt-4 p-4 rounded-lg bg-red-50 border-2 border-red-200';
          feedbackDiv.innerHTML = '\n' +
            '              <div class="flex items-start">\n' +
            '                <svg class="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">\n' +
            '                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />\n' +
            '                </svg>\n' +
            '                <div>\n' +
            '                  <p class="font-semibold text-red-800">Oops! Something went wrong.</p>\n' +
            '                  <p class="text-sm text-red-700 mt-1">Please try again or call us directly at <a href="tel:+61281128010" class="underline font-medium">(02) 8112 8010</a></p>\n' +
            '                </div>\n' +
            '              </div>\n' +
            '            ';
          feedbackDiv.classList.remove('hidden');
          console.error('Form submission error:', error);
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
          }
        }
      });
    }

    return true;
  }

  var initScheduled = false;

  function scheduleInit() {
    if (initScheduled) return;
    initScheduled = true;

    requestAnimationFrame(function () {
      initScheduled = false;
      initPortfolioLightbox();
      initContactForm();
    });
  }

  document.addEventListener('astro:page-load', scheduleInit);
  document.addEventListener('astro:after-swap', scheduleInit);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInit, { once: true });
  } else {
    scheduleInit();
  }
})();
