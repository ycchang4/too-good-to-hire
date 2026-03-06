const HEURISTICS = [
    {
        id: "no_company",
        description: "No company name found",
        check: ({ company }) => !company || company.trim() === "",
        weight: 2,
    },
    {
        id: "vague_title",
        description: "Vague or suspicious job title",
        keywords: ["opportunity", "representative", "agent", "consultant", "flexible", "unlimited"],
        check: ({ title }) => HEURISTICS[1].keywords.some(k => title?.toLowerCase().includes(k)),
        weight: 1,
    },
    // {
    //     id: "unrealistic_salary",
    //     description: "Unrealistic salary or earnings claim",
    //     keywords: ["unlimited earning", "unlimited income", "make $", "earn $", "per week", "per day"],
    //     check: ({ description }) => HEURISTICS[2].keywords.some(k => description?.toLowerCase().includes(k)),
    //     weight: 2,
    // },
    {
        id: "personal_info",
        description: "Requests personal information",
        keywords: ["ssn", "social security", "bank account", "passport", "date of birth", "credit card"],
        check: ({ description }) => HEURISTICS[2].keywords.some(k => description?.toLowerCase().includes(k)),
        weight: 3,
    },
    {
        id: "personal_email",
        description: "Contact via personal email (gmail, yahoo, etc.)",
        keywords: ["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"],
        check: ({ description }) => HEURISTICS[3].keywords.some(k => description?.toLowerCase().includes(k)),
        weight: 2,
    },
    {
        id: "pressure_language",
        description: "Pressure or urgency language detected",
        keywords: ["act now", "limited spots", "immediate hire", "urgent", "don't miss", "apply immediately"],
        check: ({ description }) => HEURISTICS[4].keywords.some(k => description?.toLowerCase().includes(k)),
        weight: 1,
    },
    {
        id: "too_good",
        description: "Too good to be true promises",
        keywords: ["no experience needed", "no experience required", "unlimited potential", "be your own boss", "work from home and earn"],
        check: ({ description }) => HEURISTICS[5].keywords.some(k => description?.toLowerCase().includes(k)),
        weight: 2,
    },
    {
        id: "vague_responsibilities",
        description: "Vague or missing responsibilities",
        keywords: ["various duties", "other tasks as assigned", "flexible role", "dynamic opportunity"],
        check: ({ description }) => HEURISTICS[6].keywords.some(k => description?.toLowerCase().includes(k)),
        weight: 1,
    },
    {
        id: "short_description",
        description: "Extremely short job description",
        check: ({ description }) => !description || description.trim().split(" ").length < 100,
        weight: 2,
    },
];

function getRiskLevel(score) {
    if (score >= 5) return "high";
    if (score >= 2) return "medium";
    return "low";
}

function analyzePosting(posting) {
    const triggered = HEURISTICS.filter(h => h.check(posting));
    const score = triggered.reduce((sum, h) => sum + h.weight, 0);
    const risk = getRiskLevel(score);

    return {
        score,
        risk,
        flags: triggered.map(h => h.description),
    };
}