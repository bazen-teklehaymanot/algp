namespace Algo.App;

public interface ICache
{
    void Add(string key, string value);
    string? Get(string key);
    void Remove(string key);
    void Clear();
}
