using WebApplication1.Data;

namespace WebApplication1.Properties;

public class RolesHierarchy
{
    public IEnumerable<string> GetClaims(string role)
    {
        var allClaims = Enum.GetValues(typeof(Roles)).Cast<Roles>().ToList();
        var index = allClaims.FindIndex(x => x.ToString().Equals(role));
        
        return allClaims.SkipWhile((a, b) => b < index).Select(x=>x.ToString());
    }
}