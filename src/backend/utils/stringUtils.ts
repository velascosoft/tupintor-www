export const isNullOrEmpty = (val: string): boolean => {
    return !val || val.length === 0;
}

export const isHttpsUrl = (url: string): boolean => {
    const httpsUrlPattern = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return httpsUrlPattern.test(url);
}

export const normalizeHexColor = (val: string): string => {
    const cleaned = val.trim();
    if (/^#[0-9a-fA-F]{1,6}$/.test(cleaned)) {
        const hex = cleaned.slice(1).padEnd(6, '0');
        return `#${hex}`;
    }
    return val;
};

export const isColorCode = (value: string): boolean => {
    const normalized = normalizeHexColor(value);
    return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(normalized);
};