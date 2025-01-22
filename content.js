// Button selectors for different UI elements
const SELECTORS = {
    STUDY_BUTTONS: '.study-button.acquire-mode',
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
    RESULT_BUTTONS: '.study-result-footer-component .base-button-component',
    QUIT_BUTTON: '.exam-header__inner .back-button'
};

class ButtonFinder {
    static findByText(selector, text) {
        const buttons = document.querySelectorAll(selector);
        return Array.from(buttons).find(button =>
            button.textContent.trim().includes(text)
        );
    }

    static findStudyButtonByIndex(index) {
        const buttons = document.querySelectorAll(SELECTORS.STUDY_BUTTONS);
        return buttons[index] || null;
    }

    static findLeftButton() {
        return this.findStudyButtonByIndex(0);
    }

    static findRightButton() {
        return this.findStudyButtonByIndex(1);
    }

    static findResultButtonByIndex(index) {
        const buttons = document.querySelectorAll(SELECTORS.RESULT_BUTTONS);
        return buttons[index] || null;
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
        const normalNext = document.querySelector(SELECTORS.NEXT_BUTTON);
        if (normalNext) return normalNext;

        return document.querySelector(SELECTORS.PAGER_NEXT_BUTTON);
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
        // Study mode - left button
        const leftButton = ButtonFinder.findLeftButton();
        if (leftButton) {
            leftButton.click();
            return;
        }

        // Choice mode - unknown button
        const unknownButton = ButtonFinder.findChoiceButton(false);
        if (unknownButton) {
            unknownButton.click();
            return;
        }

        // Result mode - retry button (left position)
        const retryButton = ButtonFinder.findResultButtonByIndex(0);
        if (retryButton) {
            retryButton.click();
        }
    }

    static handleRightArrow() {
        // Study mode - right button
        const rightButton = ButtonFinder.findRightButton();
        if (rightButton) {
            rightButton.click();
            return;
        }

        // Choice mode - known button
        const knownButton = ButtonFinder.findChoiceButton(true);
        if (knownButton) {
            knownButton.click();
            return;
        }

        // Result mode - next button (right position)
        const nextButton = ButtonFinder.findResultButtonByIndex(2);
        if (nextButton) {
            nextButton.click();
            return;
        }

        const normalNextButton = ButtonFinder.findNextButton();
        if (normalNextButton) {
            normalNextButton.click();
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

        // Result mode - test button (middle position)
        const testButton = ButtonFinder.findResultButtonByIndex(1);
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
