using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using WebApplication1.Properties;

namespace WebApplication1.Data.AuthData;

public class RoleRequirements : IAuthorizationRequirement
{
    public string Role { get; }

    public RoleRequirements(string role)
    {
        Role = role;
    }
}

public class RequirementsHandler : AuthorizationHandler<RoleRequirements>
{

    private readonly RolesHierarchy rolesHierarchy;

    public RequirementsHandler(RolesHierarchy rolesHierarchy)
    {
        this.rolesHierarchy = rolesHierarchy;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RoleRequirements roleRequirement)
    {

        if (!context.User.Identity.IsAuthenticated)
            return Task.CompletedTask;
        
        var role = context.User.Claims.First(x => x.Type == "Role");

        if (rolesHierarchy.GetClaims(role.Value).Contains(roleRequirement.Role))
            context.Succeed(roleRequirement);
        
        return Task.CompletedTask;
    }
}