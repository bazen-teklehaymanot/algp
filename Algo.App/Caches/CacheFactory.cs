namespace Algo.App;

public enum CacheTypes
{
    Dictionary,
    TrieCache
}

public interface ICacheFactory
{
    ICache Create(CacheTypes cacheType);
}

public class CacheFactory : ICacheFactory
{
    public ICache Create(CacheTypes cacheType)
    {
        return cacheType switch
        {
            CacheTypes.Dictionary => new DictionaryCache(),
            CacheTypes.TrieCache => new TrieCache(),
            _ => throw new ArgumentException($"Invalid cache type: {cacheType}")
        };
    }
}
