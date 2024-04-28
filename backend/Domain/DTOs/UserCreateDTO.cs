using System.ComponentModel.DataAnnotations;

namespace backend.Domain.DTOs;

public class UserCreateDTO {
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
  [Required]
  [StringLength(8, MinimumLength = 8)]
  public string Zipcode { get; set; } = null!;
  [Required]
  public string Street { get; set; } = null!;
  [Required]
  public string AddressNumber { get; set; } = null!;
  public string? AddressComplement { get; set; }
  [Required]
  public string Neighborhood { get; set; } = null!;
  [Required]
  public string City { get; set; } = null!;
  [Required]
  public string State { get; set; } = null!;
}