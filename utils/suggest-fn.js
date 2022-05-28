export default function getAutoSuggestUsers(loginSubstring, limit) {
    const filtered = this.filter((item, idx) => !item.isDeleted && idx <= limit && item.login.match(loginSubstring));
    return filtered.sort((a, b) => a.login.localeCompare(b.login));
}