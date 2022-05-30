export default function getAutoSuggestUsers(loginSubstring, limit) {
    const filtered = this.filter(item => !item.isDeleted && item.login.match(loginSubstring));
    const filteredCount = filtered.filter((item, idx) => idx <= limit);
    return filteredCount.sort((a, b) => a.login.localeCompare(b.login));
}
