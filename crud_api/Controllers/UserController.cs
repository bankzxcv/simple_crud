using Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System;

namespace crud_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
  private readonly UserContext _context;
  public UserController(UserContext context)
  {
    _context = context;
  }

  // GET: api/users/count
  [HttpGet("count")]
  public async Task<ActionResult<int>> GetUsersCount([FromQuery] string search = null)
  {
    // get total user number with search query option
    if (search != null)
    {
      return await _context.Users.Where(user => user.Name.Contains(search) || user.Tel.Contains(search) || user.Email.Contains(search)).CountAsync();
    }
    return await _context.Users.CountAsync();

  }

  // GET: api/users
  [HttpGet]
  public async Task<ActionResult<IEnumerable<User>>> GetUsers
    (
    [FromQuery] int skip = 0,
    [FromQuery] int limit = 10,
    [FromQuery] string search = null
    )
  {
    // get users from database
    // var users = await _context.Users.Skip(offset).Take(limit).ToListAsync();
    // get user from database by using order by and limit skip
    if (search != null)
    {
      return await _context.Users.Where(user => user.Name.Contains(search) || user.Tel.Contains(search) || user.Email.Contains(search))
      .OrderByDescending(user => user.UpdatedAt)
      .Skip(skip)
      .Take(limit)
      .ToListAsync();
    }
    return await _context.Users.OrderByDescending(user => user.UpdatedAt)
          .Skip(skip)
          .Take(limit)
          .ToListAsync();
  }

  // GET: api/users/5
  [HttpGet("{id}")]
  public async Task<ActionResult<User>> GetUser(int id)
  {
    var user = await _context.Users.FindAsync(id);

    if (user == null)
    {
      return NotFound();
    }

    return user;
  }

  // POST: api/users
  [HttpPost]
  public async Task<ActionResult<User>> PostUser(User user)
  {
    User usr = new User(user.Id, user.Name, user.Tel, user.Email);

    _context.Users.Add(usr);

    await _context.SaveChangesAsync();

    return CreatedAtAction("GetUser", new { id = user.Id }, user);
  }

  // PUT: api/users/5
  [HttpPut("{id}")]
  public async Task<IActionResult> PutUser(int id, User user)
  {
    if (id != user.Id)
    {
      return BadRequest();
    }

    _context.Entry(user).State = EntityState.Modified;

    await _context.SaveChangesAsync();

    return NoContent();
  }

  // Delete api/users/5
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteUser(int id)
  {
    var user = await _context.Users.FindAsync(id);

    if (user == null)
    {
      return NotFound();
    }

    _context.Users.Remove(user);

    await _context.SaveChangesAsync();

    return NoContent();
  }

}