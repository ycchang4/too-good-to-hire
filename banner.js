function injectBanner(result) {
    // Remove any existing banner first
    const existing = document.getElementById('tgth-banner');
    if (existing) existing.remove();

    const colors = {
        low: { bg: '#f0fdf4', border: '#86efac', text: '#166534' },
        medium: { bg: '#fefce8', border: '#fde047', text: '#854d0e' },
        high: { bg: '#fef2f2', border: '#fca5a5', text: '#991b1b' },
    };

    const labels = {
        low: '✅ Low Risk — This posting looks legitimate',
        medium: '⚠️ Medium Risk — Some suspicious signals detected',
        high: '🚨 High Risk — This posting has multiple red flags',
    };

    const c = colors[result.risk];

    const banner = document.createElement('div');
    banner.id = 'tgth-banner';
    banner.style.cssText = `
    margin: 12px 0;
    padding: 12px 16px;
    border: 1px solid ${c.border};
    border-radius: 8px;
    background: ${c.bg};
    color: ${c.text};
    font-family: sans-serif;
    font-size: 14px;
    line-height: 1.5;
  `;

    const title = document.createElement('div');
    title.style.cssText = `font-weight: 600; margin-bottom: 6px;`;
    title.textContent = labels[result.risk];

    banner.appendChild(title);

    if (result.flags.length > 0) {
        const flagList = document.createElement('ul');
        flagList.style.cssText = `margin: 0; padding-left: 18px;`;
        result.flags.forEach(flag => {
            const item = document.createElement('li');
            item.textContent = flag;
            flagList.appendChild(item);
        });
        banner.appendChild(flagList);
    }

    // Inject banner into the job posting
    const target = document.querySelector('.job-details-jobs-unified-top-card__container--two-pane');
    if (target) target.prepend(banner);
}