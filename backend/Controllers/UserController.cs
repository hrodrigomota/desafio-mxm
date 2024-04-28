using backend.Domain.Data;
using backend.Domain.DTOs;
using backend.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("users")]

public class UserController : ControllerBase {

  private readonly AppDbContext _appDbContext;

  public UserController(AppDbContext appDbContext) {
    _appDbContext = appDbContext;
  }

  [HttpGet]
  public async Task<IActionResult> GetUsersAsync() {
    var users = await _appDbContext.Users.Include(a => a.Address).ToListAsync();
    return users.Count == 0 ? NoContent() : Ok(users);
  }

  [HttpPost]
  public async Task<IActionResult> SignUpAsync([FromBody] UserCreateDTO user) {
    
    if(!ModelState.IsValid) return BadRequest(ModelState);
    
    var cpfCnpjExists = await _appDbContext.Users.FirstOrDefaultAsync(u => u.CPF_CNPJ == user.CPF_CNPJ);

    if (cpfCnpjExists != null) {
      var error = new { message = "O CPF ou CNPJ já foi cadastrado."};
      return BadRequest(error);
    }

    var emailExists = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

    if (emailExists != null) {
      var error = new { message = "O E-mail já foi cadastrado."};
      return BadRequest(error);
    }

    var userRegistration = new User {
      FullName = user.FullName,
      CPF_CNPJ = user.CPF_CNPJ,
      Email = user.Email,
      PhoneNumber = user.PhoneNumber
    };

    await _appDbContext.Users.AddAsync(userRegistration);
    await _appDbContext.SaveChangesAsync();

    var userAddress = new Address {
      Zipcode = user.Zipcode,
      Street = user.Street,
      AddressNumber = user.AddressNumber,
      AddressComplement = user.AddressComplement,
      Neighborhood = user.Neighborhood,
      City = user.City,
      State = user.State,
      UserId = userRegistration.Id
    };

    await _appDbContext.Address.AddAsync(userAddress);
    await _appDbContext.SaveChangesAsync();
    
    return Created($"users/{userRegistration.Id}", userRegistration);
  }
}