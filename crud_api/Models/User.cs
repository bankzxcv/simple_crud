using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
  [Table("users")]
  public class User
  {
    [Column("id")]
    public int Id { get; set; }
    [Column("name")]
    public string Name { get; set; }
    [Column("tel")]
    public string Tel { get; set; }
    [Column("email")]
    public string Email { get; set; }
    [Column("createdat")]
    public DateTime? CreatedAt { get; set; }
    [Column("updatedat")]
    public DateTime? UpdatedAt { get; set; }

    public User(int id, string name, string tel, string email)
    {
      Id = id;
      Name = name;
      Tel = tel;
      Email = email;
      CreatedAt = DateTime.UtcNow;
      UpdatedAt = DateTime.UtcNow;
    }
  }
}