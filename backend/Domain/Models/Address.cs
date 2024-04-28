using System.ComponentModel.DataAnnotations;

namespace backend.Domain.Models;

public class Address {
  [Key]
  [Required]
  public int AddressId { get; set; }
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
  [Required]
  public int UserId { get; set; }
  public virtual User User { get; set; } = null!;
}