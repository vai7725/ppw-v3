export const search = (titlesArr = [], searchInput = '') => {
  function createTrieNode() {
    return {
      children: {},
      isEndOfWord: false,
    };
  }

  function insertWord(root, word) {
    let node = root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = createTrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  function findSuggestions(root, prefix) {
    let node = root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }

    const suggestions = [];
    findWordsWithPrefix(node, prefix, suggestions);
    return suggestions;
  }

  function findWordsWithPrefix(node, currentPrefix, suggestions) {
    if (node.isEndOfWord) {
      suggestions.push(currentPrefix);
    }

    for (const char in node.children) {
      findWordsWithPrefix(
        node.children[char],
        currentPrefix + char,
        suggestions
      );
    }
  }

  // Example usage:
  const root = createTrieNode();
  titlesArr.forEach((word) => insertWord(root, word));

  const suggestions = findSuggestions(root, searchInput);
  return suggestions;
};

const inputPrefix = 'ch';
const words = ['apple', 'appetizer', 'banana', 'cherry', 'dog', 'cat', 'chaos'];
