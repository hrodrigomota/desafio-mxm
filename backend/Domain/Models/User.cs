using System.ComponentModel.DataAnnotations;

namespace backend.Domain.Models;

public class User {
  [Key]
  [Required]
  public int Id { get; set;}
  [Required]
  [MinLength(3)]
  public string FullName { get; set;} = null!;
  [Required]
  [StringLength(15, MinimumLength = 11)]
  public string CPF_CNPJ { get; set; } = null!;
  [Required]
  [EmailAddress]
  public string Email { get; set; } = null!;
  [Required]
  [StringLength(11, MinimumLength = 10)]
  public string PhoneNumber { get; set; } = null!;
  public Address Address { get; set; } = null!;
}