document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. ЭКРАН ВВОДА ПАРОЛЯ (index.html) =================
    const lockScreen = document.getElementById('lock-screen');

    if (lockScreen) {
        const CORRECT_PIN = "1310"; // Укажи здесь нужный ПИН-код
        let currentPin = "";

        const dots = document.querySelectorAll('.dot');
        const keyButtons = document.querySelectorAll('.key-btn[data-val]');
        const deleteBtn = document.getElementById('delete-btn');
        const lockContainer = document.querySelector('.lock-container');

        keyButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (currentPin.length < 4) {
                    currentPin += button.getAttribute('data-val');
                    updateDots();

                    if (currentPin.length === 4) {
                        setTimeout(checkPin, 120);
                    }
                }
            });
        });

        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (currentPin.length > 0) {
                    currentPin = currentPin.slice(0, -1);
                    updateDots();
                }
            });
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                if (index < currentPin.length) {
                    dot.classList.add('filled');
                } else {
                    dot.classList.remove('filled');
                }
            });
        }

        function checkPin() {
            if (currentPin === CORRECT_PIN) {
                unlockSuccess();
            } else {
                unlockError();
            }
        }

        function unlockError() {
            if (lockContainer) lockContainer.classList.add('shake');
            dots.forEach(dot => dot.classList.add('error'));

            setTimeout(() => {
                if (lockContainer) lockContainer.classList.remove('shake');
                dots.forEach(dot => dot.classList.remove('error'));
                currentPin = "";
                updateDots();
            }, 400);
        }

        function unlockSuccess() {
            lockScreen.classList.remove('active');

            setTimeout(() => {
                window.location.href = "page2.html";
            }, 600);
        }
    }


    // ================= 2. СТРАНИЦА С КОНВЕРТОМ (page2.html) =================
    const envelope = document.getElementById('envelope');
    const tapHint = document.getElementById('tap-hint');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const letterScreen = document.getElementById('letter-screen');

    if (envelope) {
        envelope.addEventListener('click', (e) => {
            if (e.target.closest('.btn')) return;

            if (!envelope.classList.contains('open')) {
                envelope.classList.add('open');
                if (tapHint) tapHint.style.opacity = '0';

                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 40,
                        spread: 50,
                        origin: { y: 0.5 }
                    });
                }
            }
        });
    }

    if (yesBtn && noBtn) {
        noBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            noBtn.classList.add('hide-btn');
        });

        yesBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 80,
                    spread: 60,
                    origin: { y: 0.6 }
                });
            }

            if (letterScreen) letterScreen.classList.remove('active');

            setTimeout(() => {
                window.location.href = "page3.html";
            }, 600);
        });
    }


    // ================= 3. СТРАНИЦА ТЕСТА (page3.html) =================
    const optionCards = document.querySelectorAll('.option-card');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout;

    if (optionCards.length > 0) {
        optionCards.forEach(card => {
            card.addEventListener('click', () => {
                const isCorrect = card.getAttribute('data-correct') === 'true';

                if (isCorrect) {
                    if (typeof confetti === 'function') {
                        confetti({
                            particleCount: 90,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }

                    const quizScreen = document.getElementById('quiz-screen');
                    if (quizScreen) quizScreen.classList.remove('active');

                    setTimeout(() => {
                        window.location.href = "page4.html";
                    }, 600);

                } else {
                    card.classList.add('shake');
                    setTimeout(() => card.classList.remove('shake'), 400);

                    showToast();
                }
            });
        });

        function showToast() {
            if (toastMessage) {
                clearTimeout(toastTimeout);
                toastMessage.classList.add('show');

                toastTimeout = setTimeout(() => {
                    toastMessage.classList.remove('show');
                }, 2200);
            }
        }
    }


    // ================= 4. СТРАНИЦА ПЕРЕХОДА (page4.html) =================
    const nextPage5Btn = document.getElementById('next-to-page5');
    const giftIntroScreen = document.getElementById('gift-intro-screen');

    if (nextPage5Btn) {
        nextPage5Btn.addEventListener('click', () => {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 70,
                    spread: 60,
                    origin: { y: 0.6 }
                });
            }

            if (giftIntroScreen) {
                giftIntroScreen.classList.remove('active');
            }

            setTimeout(() => {
                window.location.href = "page4_5.html"; // Переход на страницу со слайдером карточек
            }, 600);
        });
    }


    // ================= 4.5 СТРАНИЦА СЛАЙДЕРА ПЕСЕН (page4_5.html) =================
    const songsSliderScreen = document.getElementById('songs-slider-screen');

    if (songsSliderScreen) {
        const songCards = document.querySelectorAll('.song-card');
        const dotItems = document.querySelectorAll('.dot-item');
        const prevBtn = document.getElementById('prev-song-btn');
        const nextBtn = document.getElementById('next-song-btn');
        const toPage5Btn = document.getElementById('to-page5-btn');

        let currentSlide = 0;

        function showSlide(index) {
            if (index < 0) index = songCards.length - 1;
            if (index >= songCards.length) index = 0;

            currentSlide = index;

            songCards.forEach((card, i) => {
                card.classList.toggle('active', i === currentSlide);
            });

            dotItems.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
        }

        dotItems.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'));
                showSlide(idx);
            });
        });

        if (toPage5Btn) {
            toPage5Btn.addEventListener('click', () => {
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 60,
                        spread: 50,
                        origin: { y: 0.6 }
                    });
                }

                setTimeout(() => {
                    window.location.href = "page5.html";
                }, 500);
            });
        }
    }


    // ================= 5. СТРАНИЦА ВЫБОРА ВРЕМЕНИ (page5.html) =================
    const hoursList = document.getElementById('hours-list');
    const minutesList = document.getElementById('minutes-list');
    const submitTimeBtn = document.getElementById('submit-time-btn');

    if (hoursList && minutesList && submitTimeBtn) {
        const TELEGRAM_BOT_TOKEN = "8916741202:AAGEhjHed4WaRafvPwwt_ANA3pv8o4dxymo";
        const TELEGRAM_CHAT_ID = "1015205325";

        let selectedHour = "20";
        let selectedMinute = "00";

        function populateList(container, max, defaultVal, isMinutes) {
            container.innerHTML = "";
            for (let i = 0; i < max; i++) {
                const val = i < 10 ? "0" + i : "" + i;
                const item = document.createElement('div');
                item.className = 'time-item' + (val === defaultVal ? ' active' : '');
                item.setAttribute('data-val', val);
                item.innerText = val;

                item.addEventListener('click', () => {
                    container.querySelectorAll('.time-item').forEach(el => el.classList.remove('active'));
                    item.classList.add('active');
                    if (isMinutes) {
                        selectedMinute = val;
                    } else {
                        selectedHour = val;
                    }
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });

                container.appendChild(item);
            }
        }

        populateList(hoursList, 24, selectedHour, false);
        populateList(minutesList, 60, selectedMinute, true);

        function handleScroll(container, isMinutes) {
            let scrollTimeout;
            container.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const items = container.querySelectorAll('.time-item');
                    const containerCenter = container.getBoundingClientRect().top + container.offsetHeight / 2;

                    let closestItem = null;
                    let minDistance = Infinity;

                    items.forEach(item => {
                        const itemCenter = item.getBoundingClientRect().top + item.offsetHeight / 2;
                        const distance = Math.abs(containerCenter - itemCenter);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestItem = item;
                        }
                    });

                    if (closestItem) {
                        items.forEach(el => el.classList.remove('active'));
                        closestItem.classList.add('active');
                        const val = closestItem.getAttribute('data-val');
                        if (isMinutes) {
                            selectedMinute = val;
                        } else {
                            selectedHour = val;
                        }
                    }
                }, 80);
            });
        }

        handleScroll(hoursList, false);
        handleScroll(minutesList, true);

        setTimeout(() => {
            const defaultHourEl = hoursList.querySelector('[data-val="' + selectedHour + '"]');
            const defaultMinEl = minutesList.querySelector('[data-val="' + selectedMinute + '"]');
            if (defaultHourEl) defaultHourEl.scrollIntoView({ block: 'center' });
            if (defaultMinEl) defaultMinEl.scrollIntoView({ block: 'center' });
        }, 150);

        submitTimeBtn.addEventListener('click', () => {
            submitTimeBtn.disabled = true;
            submitTimeBtn.innerText = "Отправка...";

            const fullTime = selectedHour + ":" + selectedMinute;
            const message = "🎁 Выбранное время для подарка: " + fullTime;
            const telegramUrl = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";

            fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (typeof confetti === 'function') {
                        confetti({
                            particleCount: 100,
                            spread: 80,
                            origin: { y: 0.6 }
                        });
                    }
                    submitTimeBtn.innerText = "Принято! ❤️";
                    submitTimeBtn.style.background = "#4cd964";
                    submitTimeBtn.style.color = "#ffffff";

                    setTimeout(() => {
                        window.location.href = "page6.html";
                    }, 1500);
                })
                .catch(error => {
                    console.error('Ошибка отправки в Telegram:', error);
                    submitTimeBtn.innerText = "Ошибка 😞";
                    submitTimeBtn.disabled = false;
                });
        });
    }


    // ================= 6. СТРАНИЦА ОТЗЫВА И ОЦЕНКИ (page6.html) =================
    const starsContainer = document.getElementById('stars-container');
    const sendReviewBtn = document.getElementById('send-review-btn');
    const feedbackText = document.getElementById('feedback-text');

    if (starsContainer && sendReviewBtn) {
        const TELEGRAM_BOT_TOKEN = "8916741202:AAGEhjHed4WaRafvPwwt_ANA3pv8o4dxymo";
        const TELEGRAM_CHAT_ID = "1015205325";
        const MY_TELEGRAM_USERNAME = "EVANSESY";

        let selectedRating = 0; // 0 = звёзды изначально пустые
        let isSent = false;

        const stars = starsContainer.querySelectorAll('.star');

        stars.forEach(star => {
            star.addEventListener('click', () => {
                if (isSent) return;
                selectedRating = parseInt(star.getAttribute('data-value'));
                updateStars(selectedRating);
            });
        });

        function updateStars(rating) {
            stars.forEach(s => {
                const val = parseInt(s.getAttribute('data-value'));
                if (val <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        }

        sendReviewBtn.addEventListener('click', () => {
            if (isSent) {
                window.location.href = "https://t.me/" + MY_TELEGRAM_USERNAME;
                return;
            }

            sendReviewBtn.disabled = true;
            sendReviewBtn.innerText = "Отправка...";

            const textValue = feedbackText ? feedbackText.value.trim() : "";
            const textMessage = textValue !== "" ? textValue : "(Без комментариев)";
            const ratingText = selectedRating > 0 ? selectedRating + " / 5 ⭐" : "Не выбрана";

            const fullMessage = "⭐ Отзыв о подарке:\n" +
                "Оценка: " + ratingText + "\n" +
                "Комментарий: " + textMessage;

            const telegramUrl = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";

            fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: fullMessage
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (typeof confetti === 'function') {
                        confetti({
                            particleCount: 120,
                            spread: 90,
                            origin: { y: 0.6 }
                        });
                    }

                    isSent = true;
                    sendReviewBtn.disabled = false;

                    const tgIconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle; margin-right: 8px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.38-.49 1.07-.75 4.19-1.82 6.98-3.02 8.38-3.6 3.99-1.66 4.82-1.95 5.36-1.95.12 0 .38.03.55.17.14.12.18.28.2.43-.02.07-.02.19-.03.22z"/></svg>`;

                    sendReviewBtn.innerHTML = tgIconSvg + "Перейти в наш чат";
                    sendReviewBtn.classList.add('telegram-chat-btn');

                    if (feedbackText) feedbackText.disabled = true;
                })
                .catch(error => {
                    console.error('Ошибка отправки отзыва:', error);
                    sendReviewBtn.innerText = "Ошибка 😞";
                    sendReviewBtn.disabled = false;
                });
        });
    }

});