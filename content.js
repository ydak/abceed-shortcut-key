// Button selectors for different UI elements
const SELECTORS = {
    STUDY_BUTTON: '.study-button.acquire-mode',
    CHOICE_BUTTON: {
        KNOWN: '.choice-button.is-known',
        UNKNOWN: '.choice-button.is-unknown'
    },
    FUNCTION_BUTTON: {
        EXPLANATION: '.score-button-component',
        SPEAKER: '.speaker-button-component'
    },
    NEXT_BUTTON: '.next-button',
    PREV_BUTTON: '.prev-button',
    PAGER_NEXT_BUTTON: '.study-acquire-pager-component .next-button',
    PAGER_PREV_BUTTON: '.study-acquire-pager-component .prev-button',
    RESULT_BUTTON: '.study-result-footer-component .base-button-component',
    QUIT_BUTTON: '.exam-header__inner .back-button'
};

// Button text mappings
const BUTTON_TEXT = {
    RANDOM: 'ランダム',
    REVIEW: '復習',
    NEXT: '次へ',
    RETRY: 'もう一度',
    QUIT: 'やめる',
    TEST: '確認テスト'
};

class ButtonFinder {
    static findByText(selector, text) {
        const buttons = document.querySelectorAll(selector);
        return Array.from(buttons).find(button =>
            button.textContent.trim().startsWith(text)
        );
    }

    static findStudyButton(text) {
        return this.findByText(SELECTORS.STUDY_BUTTON, text);
    }

    static findChoiceButton(isKnown) {
        const selector = isKnown ? SELECTORS.CHOICE_BUTTON.KNOWN : SELECTORS.CHOICE_BUTTON.UNKNOWN;
        return document.querySelector(selector);
    }

    static findFunctionButton(type) {
        const selector = SELECTORS.FUNCTION_BUTTON[type.toUpperCase()];
        return selector ? document.querySelector(selector) : null;
    }

    static findNextButton() {
        // Try finding normal next button
        const normalNext = this.findByText(SELECTORS.NEXT_BUTTON, BUTTON_TEXT.NEXT);
        if (normalNext) return normalNext;

        // Try finding result screen next button
        return this.findByText(SELECTORS.RESULT_BUTTON, BUTTON_TEXT.NEXT);
    }

    static findResultButton(text) {
        return this.findByText(SELECTORS.RESULT_BUTTON, text);
    }
}

class KeyboardHandler {
    static handleEscape() {
        const quitButton = document.querySelector(SELECTORS.QUIT_BUTTON);
        if (quitButton) {
            quitButton.click();
        }
    }

    static handlePageUp() {
        const prevButton = document.querySelector(SELECTORS.PAGER_PREV_BUTTON);
        if (prevButton) {
            prevButton.click();
        }
    }

    static handlePageDown() {
        const nextButton = document.querySelector(SELECTORS.PAGER_NEXT_BUTTON);
        if (nextButton) {
            nextButton.click();
        }
    }


    static handleLeftArrow() {
        const randomButton = ButtonFinder.findStudyButton(BUTTON_TEXT.RANDOM);
        if (randomButton) {
            randomButton.click();
            return;
        }

        const unknownButton = ButtonFinder.findChoiceButton(false);
        if (unknownButton) {
            unknownButton.click();
            return;
        }

        const retryButton = ButtonFinder.findResultButton(BUTTON_TEXT.RETRY);
        if (retryButton) {
            retryButton.click();
        }
    }

    static handleRightArrow() {
        const reviewButton = ButtonFinder.findStudyButton(BUTTON_TEXT.REVIEW);
        if (reviewButton) {
            reviewButton.click();
            return;
        }

        const knownButton = ButtonFinder.findChoiceButton(true);
        if (knownButton) {
            knownButton.click();
            return;
        }

        const nextButton = ButtonFinder.findNextButton();
        if (nextButton) {
            nextButton.click();
            return;
        }

        const quitButton = ButtonFinder.findResultButton(BUTTON_TEXT.QUIT);
        if (quitButton) {
            quitButton.click();
        }
    }

    static handleUpArrow() {
        const prevButton = document.querySelector(SELECTORS.PAGER_PREV_BUTTON);
        if (prevButton && prevButton.style.display !== 'none') {
            prevButton.click();
            return;
        }

        const explanationButton = ButtonFinder.findFunctionButton('explanation');
        if (explanationButton) {
            explanationButton.click();
            return;
        }

        const testButton = ButtonFinder.findResultButton(BUTTON_TEXT.TEST);
        if (testButton) {
            testButton.click();
        }
    }

    static handleDownArrow() {
        const nextButton = document.querySelector(SELECTORS.PAGER_NEXT_BUTTON);
        if (nextButton && nextButton.style.display !== 'none') {
            nextButton.click();
            return;
        }

        const speakerButton = ButtonFinder.findFunctionButton('speaker');
        if (speakerButton) {
            speakerButton.click();
        }
    }
}

// Main event listener
document.addEventListener('keydown', function (event) {
    const keyHandlers = {
        'ArrowLeft': () => KeyboardHandler.handleLeftArrow(),
        'ArrowRight': () => KeyboardHandler.handleRightArrow(),
        'ArrowUp': () => KeyboardHandler.handleUpArrow(),
        'ArrowDown': () => KeyboardHandler.handleDownArrow(),

        'Escape': () => KeyboardHandler.handleEscape()
    };

    const handler = keyHandlers[event.key];
    if (handler) {
        handler();
    }
});
