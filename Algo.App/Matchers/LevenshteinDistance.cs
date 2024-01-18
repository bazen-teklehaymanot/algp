namespace Algo.App;

public class LevenshteinDistance : IStringMatcher
{
    public float Match(string a, string b)
    {
        if (string.IsNullOrEmpty(a))
        {
            return !string.IsNullOrEmpty(b) ? b.Length : 0;
        }

        if (string.IsNullOrEmpty(b))
        {
            return !string.IsNullOrEmpty(a) ? a.Length : 0;
        }

        int lengthA = a.Length;
        int lengthB = b.Length;
        var distances = new int[lengthA + 1, lengthB + 1];

        for (int i = 0; i <= lengthA; distances[i, 0] = i++) ;
        for (int j = 0; j <= lengthB; distances[0, j] = j++) ;

        for (int i = 1; i <= lengthA; i++)
        {
            for (int j = 1; j <= lengthB; j++)
            {
                int cost = (b[j - 1] == a[i - 1]) ? 0 : 1;

                distances[i, j] = Math.Min(
                    Math.Min(distances[i - 1, j] + 1, distances[i, j - 1] + 1),
                    distances[i - 1, j - 1] + cost);
            }
        }

        return distances[lengthA, lengthB];
    }
}
