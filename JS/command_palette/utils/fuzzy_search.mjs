export class FuzzySearch {
  /**
   * VS Code-style fuzzy scoring algorithm
   * @param {string} target The string to score against
   * @param {string} query The user's search query
   * @returns {number} A score representing the match quality (0 = no match)
   */
  static calculateScore(target, query) {
    if (!target || !query) return 0;

    const targetLower = target.toLowerCase();
    const queryLower = query.toLowerCase();
    const targetLen = target.length;
    const queryLen = query.length;

    if (queryLen > targetLen) return 0;
    if (queryLen === 0) return 0;

    // Exact match
    if (targetLower === queryLower) {
      return 200;
    }

    // Starts with query
    if (targetLower.startsWith(queryLower)) {
      return 100 + queryLen;
    }

    // Initials match (e.g., "np" matches "New Private Window")
    const initials = targetLower
      .split(/[\s-_]+/)
      .map((word) => word[0])
      .join("");
    if (initials === queryLower) {
      return 90 + queryLen;
    }

    // Fuzzy match with position bonuses
    let score = 0;
    let queryIndex = 0;
    let lastMatchIndex = -1;
    let consecutiveMatches = 0;

    for (let targetIndex = 0; targetIndex < targetLen; targetIndex++) {
      if (
        queryIndex < queryLen &&
        targetLower[targetIndex] === queryLower[queryIndex]
      ) {
        let bonus = 10;

        // Word boundary bonus
        if (
          targetIndex === 0 ||
          [" ", "-", "_"].includes(targetLower[targetIndex - 1])
        ) {
          bonus += 15;
        }

        // Consecutive match bonus
        if (lastMatchIndex === targetIndex - 1) {
          consecutiveMatches++;
          bonus += 20 * consecutiveMatches;
        } else {
          consecutiveMatches = 0;
        }

        // Distance penalty
        if (lastMatchIndex !== -1) {
          const distance = targetIndex - lastMatchIndex;
          bonus -= Math.min(distance - 1, 10);
        }

        score += bonus;
        lastMatchIndex = targetIndex;
        queryIndex++;
      }
    }

    // Return score only if all query characters were matched
    return queryIndex === queryLen ? score : 0;
  }

  /**
   * Checks if a string contains all characters of a query in order (fuzzy match)
   * @param {string} target String to search in
   * @param {string} query Query string
   * @returns {boolean} True if all query chars found in order
   */
  static fuzzyMatch(target, query) {
    if (!target || !query) return false;

    const targetLower = target.toLowerCase();
    const queryLower = query.toLowerCase();

    let queryIndex = 0;
    for (let i = 0; i < targetLower.length && queryIndex < queryLower.length; i++) {
      if (targetLower[i] === queryLower[queryIndex]) {
        queryIndex++;
      }
    }

    return queryIndex === queryLower.length;
  }
}
