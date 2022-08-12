using WebApplication1.Data.Properties;

namespace WebApplication1.Data;

public class InnerWork
{
    public int Id { get; set; }
    
    public InnerWorkType InnerWorkType { get; set; }
    
    public List<Cargo> AffectedCargo { get; set; }
    
    public string? CommentaryBefore { get; set; }
    public string? CommentaryAfter { get; set; }

    public InnerWork()
    {
    }

    public InnerWork(InnerWorkType innerWorkType, List<Cargo> affectedCargo, string? commentaryBefore, string? commentaryAfter)
    {
        InnerWorkType = innerWorkType;
        AffectedCargo = affectedCargo;
        CommentaryBefore = commentaryBefore;
        CommentaryAfter = commentaryAfter;
    }
}