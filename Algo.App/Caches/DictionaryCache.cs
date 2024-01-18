namespace Algo.App;

public class DictionaryCache : ICache
{
    private readonly Dictionary<string, string> _cache;
    public DictionaryCache()
    {
        _cache = new Dictionary<string, string>();
    }

    public void Add(string key, string value)
    {
        if (_cache.ContainsKey(key))
        {
            _cache[key] = value;
        }
        else
        {
            _cache.Add(key, value);
        }
    }

    public void Clear()
    {
        _cache.Clear();
    }

    public string? Get(string key)
    {
        return _cache.TryGetValue(key, out string? value) ? value : null;
    }

    public void Remove(string key)
    {
        _cache.Remove(key);
    }
}
