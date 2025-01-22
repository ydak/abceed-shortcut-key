document.addEventListener('keydown', function (event) {
    // テキストコンテンツでボタンを特定する関数
    function findButtonByText(text) {
        const buttons = document.querySelectorAll('.study-button.acquire-mode');
        return Array.from(buttons).find(button =>
            button.textContent.trim().startsWith(text)
        );
    }

    // 選択ボタンを特定する関数
    function findChoiceButton(isKnown) {
        const className = isKnown ? 'is-known' : 'is-unknown';
        return document.querySelector(`.choice-button.${className}`);
    }

    // 解説・音声ボタンを特定する関数
    function findFunctionButton(type) {
        if (type === 'explanation') {
            return document.querySelector('.score-button-component');
        } else if (type === 'speaker') {
            return document.querySelector('.speaker-button-component');
        }
        return null;
    }

    // 次へボタンを特定する関数
    function findNextButton() {
        // まず通常の次へボタンを探す
        const nextButtons = document.querySelectorAll('.next-button');
        const normalNextButton = Array.from(nextButtons).find(button =>
            button.textContent.trim() === '次へ'
        );
        if (normalNextButton) return normalNextButton;

        // 結果画面の次へボタンを探す
        const resultButtons = document.querySelectorAll('.study-result-footer-component .base-button-component');
        return Array.from(resultButtons).find(button =>
            button.textContent.trim() === '次へ'
        );
    }

    // 結果画面のボタンを特定する関数
    function findResultButton(text) {
        const buttons = document.querySelectorAll('.study-result-footer-component .base-button-component');
        return Array.from(buttons).find(button =>
            button.textContent.trim() === text
        );
    }

    switch (event.key) {
        case 'ArrowLeft':
            // 学習モード：ランダムボタン
            const randomButton = findButtonByText('ランダム');
            if (randomButton) {
                randomButton.click();
            } else {
                // 問題モード：わからないボタン
                const unknownButton = findChoiceButton(false);
                if (unknownButton) {
                    unknownButton.click();
                } else {
                    // 結果画面：もう一度ボタン
                    const retryButton = findResultButton('もう一度');
                    if (retryButton) {
                        retryButton.click();
                    }
                }
            }
            break;

        case 'ArrowRight':
            // 学習モード：復習ボタン
            const reviewButton = findButtonByText('復習');
            if (reviewButton) {
                reviewButton.click();
            } else {
                // 問題モード：わかるボタン
                const knownButton = findChoiceButton(true);
                if (knownButton) {
                    knownButton.click();
                } else {
                    // 次へボタン
                    const nextButton = findNextButton();
                    if (nextButton) {
                        nextButton.click();
                    } else {
                        // 結果画面：やめるボタン
                        const quitButton = findResultButton('やめる');
                        if (quitButton) {
                            quitButton.click();
                        }
                    }
                }
            }
            break;

        case 'ArrowUp':
            // 解説ボタン
            const explanationButton = findFunctionButton('explanation');
            if (explanationButton) {
                explanationButton.click();
            } else {
                // 結果画面：確認テストボタン
                const testButton = findResultButton('確認テスト');
                if (testButton) {
                    testButton.click();
                }
            }
            break;

        case 'ArrowDown':
            // 音声ボタン
            const speakerButton = findFunctionButton('speaker');
            if (speakerButton) {
                speakerButton.click();
            }
            break;
    }
});
