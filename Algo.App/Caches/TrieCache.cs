namespace Algo.App;

public class TrieNode
{
    public Dictionary<char, TrieNode> Children = new();
    public bool EndOfWord { get; set; } = false;
}

public class TrieCache : ICache
{
    private TrieNode _root;

    public TrieCache()
    {
        _root = new TrieNode();
    }

    public void Add(string key, string value)
    {
        TrieNode node = _root;

        foreach (char ch in key)
        {
            if (!node.Children.ContainsKey(ch))
            {
                node.Children[ch] = new TrieNode();
            }

            node = node.Children[ch];
        }

        node.EndOfWord = true;
    }

    public string? Get(string key)
    {
        TrieNode node = _root;
        string traversedPath = "";

        foreach (char ch in key)
        {
            if (!node.Children.ContainsKey(ch))
            {
                return null;
            }

            traversedPath += ch;
            node = node.Children[ch];
        }

        return node != null && node.EndOfWord ? traversedPath : null;
    }

    public void Remove(string key)
    {
        Remove(_root, key, 0);

        static bool Remove(TrieNode node, string key, int index)
        {
            if (index == key.Length)
            {
                if (!node.EndOfWord)
                {
                    return false;
                }

                node.EndOfWord = false;

                return node.Children.Count == 0;
            }

            char ch = key[index];
            TrieNode? nextNode = null;

            if (node.Children.TryGetValue(ch, out TrieNode? value))
            {
                nextNode = value;
            }

            if (nextNode == null)
            {
                return false;
            }

            bool shouldDeleteCurrentNode = Remove(nextNode, key, index + 1);

            if (shouldDeleteCurrentNode)
            {
                node.Children.Remove(ch);

                return node.Children.Count == 0;
            }

            return false;
        }

    }
    public void Clear()
    {
        _root = new TrieNode();
    }
}