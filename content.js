// analyzer.js is loaded separately via manifest.json
function extractJobPosting() {
    const jobTitle = document.querySelector('.job-details-jobs-unified-top-card__job-title')?.innerText?.trim();
    const companyName = document.querySelector('.job-details-jobs-unified-top-card__company-name a')?.innerText?.trim();
    const jobDescription = document.querySelector('.jobs-description__content')?.innerText?.trim();

    return {
        title: jobTitle || null,
        company: companyName || null,
        description: jobDescription || null,
    };
}

function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) {
        callback();
        return;
    }

    const observer = new MutationObserver(() => {
        const el= document.querySelector(selector);
        if (el) {
            observer.disconnect();
            callback();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function analyze() {
    waitForElement('.job-details-jobs-unified-top-card__company-name a', () => {
        waitForElement('.jobs-description__content', () => {
            const posting = extractJobPosting();
            const result = analyzePosting(posting);
            console.log("Too Good To Hire:", posting);
            injectBanner(result);
        });
    });
}

// Run on initial page load
analyze();

// Re-run when LinkedIn navigates to a new job posting
let lastUrl = location.href;
new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        analyze();
    }
}).observe(document.body, { childList: true, subtree: true });